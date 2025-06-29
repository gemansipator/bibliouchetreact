import React, { useState, useEffect } from 'react';
import './VisitsTable.css';

function VisitsTable({ theme }) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const columnCount = 21; // Количество столбцов (Всего + 20 групп + 2 мероприятия)

    // Состояние для хранения значений
    const [values, setValues] = useState({
        initial: Array(columnCount).fill(0), // "Состоит к началу месяца"
        daily: Array.from({ length: 31 }, () => Array(columnCount).fill(0)), // Исправленная инициализация
    });

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
                const newRow = [...newDaily[row]]; // Убеждаемся, что это массив
                newRow[col] = newValue;
                newDaily[row] = newRow;
                return { ...prev, daily: newDaily };
            }
        });
    };

    // Вычисления
    const calculateMonthlyTotal = (col) => {
        // Сумма только по дням месяца (без "Состоит к началу месяца")
        return values.daily.reduce((sum, row) => sum + row[col], 0);
    };

    const calculateYearlyTotal = (col) => {
        // Сумма "Состоит к началу месяца" + дни месяца
        return values.initial[col] + values.daily.reduce((sum, row) => sum + row[col], 0);
    };

    // Эффект для обработки ввода и клика
    useEffect(() => {
        const inputs = document.querySelectorAll('.table-input');
        inputs.forEach(input => {
            if (!input.readOnly) { // Применяем обработчики только к редактируемым полям
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
                                    />
                                </td>
                            ))}
                        </tr>
                        {days.map(day => (
                            <tr key={day}>
                                <td className="day-cell">{day}</td>
                                {Array.from({ length: columnCount }, (_, col) => (
                                    <td key={col}>
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            defaultValue="0"
                                            className="table-input"
                                            data-index={`${day}-${col}`}
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