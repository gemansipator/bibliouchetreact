import React, { useState, useEffect, useRef } from 'react';
import './VisitsTable.css';

function VisitsTable({ theme }) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const columnCount = 21; // Количество столбцов

    // Состояние для хранения значений и отключённых дней
    const [values, setValues] = useState({
        initial: Array(columnCount).fill(0),
        daily: Array.from({ length: 31 }, () => Array(columnCount).fill(0)),
    });
    const [disabledDays, setDisabledDays] = useState([]);

    // Функция для вычисления суммы колонки 1 (индекс 0) для строк дней
    const calculateColumn1 = (rowIndex) => {
        if (disabledDays.includes(rowIndex)) return 0;
        return values.daily[rowIndex].slice(5, 17).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    };

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
                // Пересчитываем колонку 1 для текущей строки
                newDaily[row][0] = calculateColumn1(row);
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

    // Проверка условия для стилизации ячейки в 4-й колонке
    const shouldApplyWarningStyle = (rowIndex) => {
        return values.daily[rowIndex][2] === 0 && values.daily[rowIndex][19] > 0;
    };

    // Обработка двойного клика
    const lastClickTime = useRef(0);
    const lastClickedDay = useRef(null);

    useEffect(() => {
        const handleDoubleClick = (e) => {
            const dayCell = e.target.closest('td.day-cell');
            if (dayCell) {
                const day = parseInt(dayCell.textContent) - 1;
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

    // Эффект для обработки ввода и пересчёта колонки 1
    useEffect(() => {
        const inputs = document.querySelectorAll('.table-input:not([readonly]):not([disabled])');
        const handleClick = function () {
            if (this.value === '0' && !disabledDays.includes(parseInt(this.dataset.index.split('-')[0]))) {
                this.value = '';
            }
        };
        const handleInput = function (e) {
            let value = this.value.trim();
            if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) {
                value = value.replace(/^0+/, '');
            }
            if (value === '') value = '0';
            this.value = value;
            const [row, col] = this.dataset.index.split('-');
            handleInputChange(row === 'initial' ? 'initial' : parseInt(row), parseInt(col), value);
        };
        const handleBlur = function () {
            const value = this.value.trim();
            if (!/^\d+$/.test(value) || value === '') {
                this.value = '0';
            }
            const [row, col] = this.dataset.index.split('-');
            handleInputChange(row === 'initial' ? 'initial' : parseInt(row), parseInt(col), this.value);
        };
        const handleKeyDown = function (e) {
            if (e.key === 'Enter') {
                this.blur();
            }
        };

        inputs.forEach(input => {
            input.addEventListener('click', handleClick);
            input.addEventListener('input', handleInput);
            input.addEventListener('blur', handleBlur);
            input.addEventListener('keydown', handleKeyDown);
        });

        // Пересчёт колонки 1 для всех строк при изменении disabledDays или values.daily
        setValues(prev => {
            const newDaily = [...prev.daily];
            newDaily.forEach((row, index) => {
                row[0] = disabledDays.includes(index) ? 0 : calculateColumn1(index);
            });
            return { ...prev, daily: newDaily };
        });

        return () => {
            inputs.forEach(input => {
                input.removeEventListener('click', handleClick);
                input.removeEventListener('input', handleInput);
                input.removeEventListener('blur', handleBlur);
                input.removeEventListener('keydown', handleKeyDown);
            });
        };
    }, [disabledDays, values.daily]);

    return (
        <div className={`p-4 ${theme}`}>
            <h2 className="text-2xl font-bold text-center mb-4">Число посещений библиотеки за [месяц] [год]</h2>
            <div className="table-wrapper">
                <div className="table-container">
                    <table className="visits-table">
                        <thead className="sticky-header">
                        <tr className="header">
                            <th rowSpan="3">Число месяца</th>
                            <th rowSpan="3">Всего</th>
                            <th colSpan="3">Число посещений библиотеки</th>
                            <th colSpan="1">-</th>
                            <th colSpan="14">Отдельные группы пользователей</th>
                            <th rowSpan="3">Количество массовых мероприятий</th>
                            <th rowSpan="3">Количество внестацион. мероприятий</th>
                        </tr>
                        <tr className="header">
                            <th rowSpan="2">Из них для получения библ.-инф. услуг (из гр.1)</th>
                            <th rowSpan="2">Число посещений массовых мероприятий</th>
                            <th rowSpan="2">Число посещений внестационарных мероприятий</th>
                            <th rowSpan="2">Число обращений удалённых пользователей</th>
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
                        <tr className="header"></tr>
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
                            <th>22</th>
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
                                        onChange={(e) => handleInputChange('initial', col, e.target.value)}
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
                                            value={values.daily[day - 1][col]}
                                            className={`table-input ${disabledDays.includes(day - 1) ? 'disabled-input' : ''} ${
                                                col === 2 && shouldApplyWarningStyle(day - 1) ? 'warning-blue' : ''
                                            }`}
                                            data-index={`${day - 1}-${col}`}
                                            readOnly={col === 0}
                                            disabled={disabledDays.includes(day - 1)}
                                            onChange={(e) => col !== 0 && handleInputChange(day - 1, col, e.target.value)}
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

export default VisitsTable;