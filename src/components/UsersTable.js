import React, { useState, useEffect, useRef } from 'react';
import './UsersTable.css';

function UsersTable({ theme }) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const columnCount = 20; // Количество столбцов

    // Состояние для хранения значений и отключённых дней
    const [values, setValues] = useState({
        initial: Array(columnCount).fill(0),
        daily: Array.from({ length: 31 }, () => Array(columnCount).fill(0)),
    });
    const [disabledDays, setDisabledDays] = useState([]); // Список отключённых дней (индексы 0-30)

    // Обновление значений при вводе
    const handleInputChange = (row, col, value) => {
        const newValue = value === '' ? 0 : parseInt(value) || 0;
        setValues(prev => {
            if (row === 'initial') {
                const newInitial = [...prev.initial];
                newInitial[col] = newValue;
                return { ...prev, initial: newInitial };
            } else {
                const newDaily = [...prev.daily];
                const newRow = [...newDaily[row]];
                newRow[col] = newValue;
                newDaily[row] = newRow;
                return { ...prev, daily: newDaily };
            }
        });
    };

    // Вычисления с учётом отключённых дней
    const calculateMonthlyTotal = (col) => {
        return values.daily.reduce((sum, row, index) => {
            return disabledDays.includes(index) ? sum : sum + row[col];
        }, 0);
    };

    const calculateYearlyTotal = (col) => {
        return values.initial[col] + values.daily.reduce((sum, row, index) => {
            return disabledDays.includes(index) ? sum : sum + row[col];
        }, 0);
    };

    // Обработка двойного клика
    const lastClickTime = useRef(0);
    const lastClickedDay = useRef(null);

    useEffect(() => {
        const handleDoubleClick = (e) => {
            const dayCell = e.target.closest('td.day-cell');
            if (dayCell) {
                const day = parseInt(dayCell.textContent) - 1; // Индекс дня (0-30)
                const currentTime = Date.now();
                if (lastClickedDay.current === day && (currentTime - lastClickTime.current) <= 1500) {
                    console.log(`Двойной клик на день ${day + 1}, disabledDays:`, disabledDays);
                    setDisabledDays(prev =>
                        prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
                    );
                }
                lastClickTime.current = currentTime;
                lastClickedDay.current = day;
            }
        };

        document.querySelectorAll('.day-cell').forEach(cell => {
            cell.addEventListener('click', handleDoubleClick);
        });

        return () => {
            document.querySelectorAll('.day-cell').forEach(cell => {
                cell.removeEventListener('click', handleDoubleClick);
            });
        };
    }, []);

    // Эффект для обработки ввода и клика
    useEffect(() => {
        const inputs = document.querySelectorAll('.table-input');
        inputs.forEach(input => {
            if (!input.readOnly) {
                input.addEventListener('click', function() {
                    if (this.value === '0') {
                        this.value = '';
                    }
                });
                input.addEventListener('input', function(e) {
                    let value = this.value.trim();
                    if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) {
                        value = value.replace(/^0+/, '');
                    }
                    if (value === '') value = '0';
                    this.value = value;
                    const [row, col] = this.dataset.index.split('-');
                    handleInputChange(row === 'initial' ? 'initial' : parseInt(row), parseInt(col), value);
                });
                input.addEventListener('blur', function() {
                    const value = this.value.trim();
                    if (!/^\d+$/.test(value) || value === '') {
                        this.value = '0';
                    }
                    const [row, col] = this.dataset.index.split('-');
                    handleInputChange(row === 'initial' ? 'initial' : parseInt(row), parseInt(col), this.value);
                });
                input.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter') {
                        this.blur();
                    }
                });
            }
        });
    }, []);

    return (
        <div className={`p-4 ${theme}`}>
            <h2 className="text-2xl font-bold text-center mb-4">Число пользователей библиотеки за [месяц] [год]</h2>
            <div className="table-wrapper">
                <div className="table-container">
                    <table className="users-table">
                        <thead className="sticky-header">
                        <tr className="header">
                            <th rowSpan="3">Число месяца</th>
                            <th colSpan="6">Число зарегистрированных пользователей библиотеки</th>
                            <th colSpan="14">Отдельные группы пользователей</th>
                        </tr>
                        <tr className="header">
                            <th rowSpan="2">Всего</th>
                            <th colSpan="3">В т.ч. пользователей в стенах библиотеки</th>
                            <th rowSpan="2">В т.ч. обслуженных во внестационарных условиях</th>
                            <th rowSpan="2">в т.ч. удалённых пользователей (из гр.2)</th>
                            <th rowSpan="2">Дошкольники</th>
                            <th rowSpan="2">1 кл.</th>
                            <th rowSpan="2">2 кл.</th>
                            <th rowSpan="2">3 кл.</th>
                            <th rowSpan="2">4 кл.</th>
                            <th rowSpan="2">5 кл.</th>
                            <th rowSpan="2">6 кл.</th>
                            <th rowSpan="2">7 кл.</th>
                            <th rowSpan="2">8 кл.</th>
                            <th rowSpan="2">9 кл.</th>
                            <th rowSpan="2">10 кл.</th>
                            <th rowSpan="2">11 кл.</th>
                            <th rowSpan="2">РДЧ</th>
                            <th rowSpan="2">Инвалиды</th>
                        </tr>
                        <tr className="header">
                            <th>Всего</th>
                            <th>В т.ч. дети до 14 (из гр.3)</th>
                            <th>В т.ч. РДЧ (из гр.3)</th>
                        </tr>
                        <tr className="header">
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                            <th>11</th>
                            <th>12</th>
                            <th>13</th>
                            <th>14</th>
                            <th>15</th>
                            <th>16</th>
                            <th>17</th>
                            <th>18</th>
                            <th>19</th>
                            <th>20</th>
                            <th>21</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="day-cell">Состоит к началу месяца</td>
                            {Array.from({ length: columnCount }, (_, col) => (
                                <td key={col}>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        defaultValue="0"
                                        className="table-input"
                                        data-index={`initial-${col}`}
                                    />
                                </td>
                            ))}
                        </tr>
                        {days.map(day => (
                            <tr key={day} className={disabledDays.includes(day - 1) ? 'disabled-row' : ''}>
                                <td className={`day-cell ${disabledDays.includes(day - 1) ? 'disabled-day' : ''}`}>{day}</td>
                                {Array.from({ length: columnCount }, (_, col) => (
                                    <td key={col}>
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            defaultValue="0"
                                            className="table-input"
                                            data-index={`${day - 1}-${col}`}
                                            disabled={disabledDays.includes(day - 1)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td className="day-cell">Всего за месяц</td>
                            {Array.from({ length: columnCount }, (_, col) => (
                                <td key={col}>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={calculateMonthlyTotal(col)}
                                        className="table-input"
                                        readOnly
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="day-cell">Итого с начала года</td>
                            {Array.from({ length: columnCount }, (_, col) => (
                                <td key={col}>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={calculateYearlyTotal(col)}
                                        className="table-input"
                                        readOnly
                                    />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsersTable;