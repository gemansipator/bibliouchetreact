import React, { useContext, useEffect, useRef, useState } from 'react';
import { TableContext } from '../App';
import './VisitsTable.css';

/**
 * Компонент таблицы для учета числа посещений библиотеки
 * @param {Object} props - Свойства компонента
 * @param {string} props.theme - Тема оформления (светлая/темная)
 */
function VisitsTable({ theme }) {
    const { tableData, setTableData, disabledDays, setDisabledDays, clearTableData } = useContext(TableContext);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const columnCount = 21;

    /**
     * Вычисляет сумму значений для первой колонки (итого за день)
     * @param {number} rowIndex - Индекс строки (день месяца)
     * @returns {number} Сумма значений с 5-й по 16-ю колонки
     */
    const calculateColumn1 = (rowIndex) => {
        if (disabledDays.visits.includes(rowIndex)) return 0;
        return tableData.visits.daily[rowIndex].slice(5, 17).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    };

    /**
     * Обрабатывает изменение значения в ячейке таблицы
     * @param {string|number} row - Индекс строки ('initial' для начальных данных или номер дня)
     * @param {number} col - Индекс колонки
     * @param {string} value - Новое значение
     */
    const handleInputChange = (row, col, value) => {
        const newValue = value === '' ? 0 : parseInt(value) || 0;
        setTableData(prev => ({
            ...prev,
            visits: {
                ...prev.visits,
                [row === 'initial' ? 'initial' : 'daily']: row === 'initial'
                    ? [...prev.visits.initial].map((v, i) => i === col ? newValue : v)
                    : prev.visits.daily.map((r, i) => i === row ? [...r].map((v, j) => j === col ? newValue : v) : r)
            }
        }));
        if (row !== 'initial') {
            setTableData(prev => ({
                ...prev,
                visits: {
                    ...prev.visits,
                    daily: prev.visits.daily.map((r, i) => i === row ? [...r].map((v, j) => j === 0 ? calculateColumn1(row) : v) : r)
                }
            }));
        }
    };

    /**
     * Проверяет, нужно ли применять стиль предупреждения
     * @param {number} rowIndex - Индекс строки
     * @returns {boolean} true, если 4-я колонка = 0, а 20-я > 0
     */
    const shouldApplyWarningStyle = (rowIndex) => {
        return tableData.visits.daily[rowIndex][2] === 0 && tableData.visits.daily[rowIndex][19] > 0;
    };

    /**
     * Очищает значения строки "Состоит к началу месяца" (initial)
     */
    const clearInitialData = () => {
        console.log('Очистка начальных данных для VisitsTable');
        setTableData(prev => ({
            ...prev,
            visits: {
                ...prev.visits,
                initial: Array(columnCount).fill(0)
            }
        }));
    };

    const lastClickTime = useRef(0);
    const lastClickedDay = useRef(null);

    useEffect(() => {
        const handleDoubleClick = (e) => {
            const dayCell = e.target.closest('td.day-cell');
            if (dayCell) {
                const day = parseInt(dayCell.textContent) - 1;
                const currentTime = Date.now();
                if (lastClickedDay.current === day && (currentTime - lastClickTime.current) <= 1500) {
                    setDisabledDays(prev => ({
                        ...prev,
                        visits: prev.visits.includes(day) ? prev.visits.filter(d => d !== day) : [...prev.visits, day]
                    }));
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

    useEffect(() => {
        const inputs = document.querySelectorAll('.table-input:not([readonly]):not([disabled])');
        const handleClick = function () {
            if (this.value === '0' && !disabledDays.visits.includes(parseInt(this.dataset.index.split('-')[0]))) {
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

        setTableData(prev => ({
            ...prev,
            visits: {
                ...prev.visits,
                daily: prev.visits.daily.map((row, index) => [...row].map((v, j) => j === 0 ? (disabledDays.visits.includes(index) ? 0 : calculateColumn1(index)) : v))
            }
        }));

        return () => {
            inputs.forEach(input => {
                input.removeEventListener('click', handleClick);
                input.removeEventListener('input', handleInput);
                input.removeEventListener('blur', handleBlur);
                input.removeEventListener('keydown', handleKeyDown);
            });
        };
    }, [disabledDays.visits, tableData.visits.daily]);

    return (
        <div className={`p-4 ${theme}`}>
            <h2 className="text-2xl font-bold text-center mb-4 flex justify-between items-center">
                <div>Число посещений библиотеки за месяц и год</div>
                <button
                    onClick={() => clearTableData('visits')}
                    className="clear-button"
                >
                    Очистить таблицу (месяц)
                </button>
                <button
                    onClick={clearInitialData}
                    className="clear-button"
                >
                    Очистить начальные данные
                </button>
            </h2>
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
                            <th rowSpan="2">Из них для получения бибl.-инф. услуг (из гр.1)</th>
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
                                        value={tableData.visits.initial[col]}
                                        className="table-input"
                                        data-index={`initial-${col}`}
                                        onChange={(e) => handleInputChange('initial', col, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                        {days.map(day => (
                            <tr key={day} className={disabledDays.visits.includes(day - 1) ? 'disabled-row' : ''}>
                                <td className={`day-cell ${disabledDays.visits.includes(day - 1) ? 'disabled-day' : ''}`}>{day}</td>
                                {Array.from({ length: columnCount }, (_, col) => (
                                    <td key={col}>
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={tableData.visits.daily[day - 1][col]}
                                            className={`table-input ${disabledDays.visits.includes(day - 1) ? 'disabled-input' : ''} ${
                                                col === 2 && shouldApplyWarningStyle(day - 1) ? 'warning-blue' : ''
                                            }`}
                                            data-index={`${day - 1}-${col}`}
                                            readOnly={col === 0}
                                            disabled={disabledDays.visits.includes(day - 1)}
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
                                        value={tableData.visits.daily.reduce((sum, row, index) => disabledDays.visits.includes(index) ? sum : sum + row[col], 0)}
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
                                        value={tableData.visits.initial[col] + tableData.visits.daily.reduce((sum, row, index) => disabledDays.visits.includes(index) ? sum : sum + row[col], 0)}
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