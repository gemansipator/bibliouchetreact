import React, { useContext, useEffect, useRef } from 'react';
import { TableContext } from '../App';
import './UsersTable.css';

function UsersTable({ theme }) {
    const { tableData, setTableData, disabledDays, setDisabledDays, clearTableData } = useContext(TableContext);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const columnCount = 20;

    const calculateColumn1 = (rowIndex) => {
        if (disabledDays.users.includes(rowIndex)) return 0;
        return tableData.users.daily[rowIndex].slice(6, 18).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    };

    const handleInputChange = (row, col, value) => {
        const newValue = value === '' ? 0 : parseInt(value) || 0;
        setTableData(prev => ({
            ...prev,
            users: {
                ...prev.users,
                [row === 'initial' ? 'initial' : 'daily']: row === 'initial'
                    ? [...prev.users.initial].map((v, i) => i === col ? newValue : v)
                    : prev.users.daily.map((r, i) => i === row ? [...r].map((v, j) => j === col ? newValue : v) : r)
            }
        }));
        if (row !== 'initial') {
            setTableData(prev => ({
                ...prev,
                users: {
                    ...prev.users,
                    daily: prev.users.daily.map((r, i) => i === row ? [...r].map((v, j) => j === 0 ? calculateColumn1(row) : v) : r)
                }
            }));
        }
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
                        users: prev.users.includes(day) ? prev.users.filter(d => d !== day) : [...prev.users, day]
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
            if (this.value === '0' && !disabledDays.users.includes(parseInt(this.dataset.index.split('-')[0]))) {
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
            users: {
                ...prev.users,
                daily: prev.users.daily.map((row, index) => [...row].map((v, j) => j === 0 ? (disabledDays.users.includes(index) ? 0 : calculateColumn1(index)) : v))
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
    }, [disabledDays.users, tableData.users.daily]);

    return (
        <div className={`p-4 ${theme}`}>
            <h2 className="text-2xl font-bold text-center mb-4 flex justify-between items-center">
                Число пользователей библиотеки за месяц и год
                <button
                    onClick={() => clearTableData('users')}
                    className="clear-button"
                >
                    Очистить таблицу
                </button>
            </h2>
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
                                        defaultValue={tableData.users.initial[col]}
                                        className="table-input"
                                        data-index={`initial-${col}`}
                                        onChange={(e) => handleInputChange('initial', col, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                        {days.map(day => (
                            <tr key={day} className={disabledDays.users.includes(day - 1) ? 'disabled-row' : ''}>
                                <td className={`day-cell ${disabledDays.users.includes(day - 1) ? 'disabled-day' : ''}`}>{day}</td>
                                {Array.from({ length: columnCount }, (_, col) => (
                                    <td key={col}>
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={tableData.users.daily[day - 1][col]}
                                            className={`table-input ${disabledDays.users.includes(day - 1) ? 'disabled-input' : ''}`}
                                            data-index={`${day - 1}-${col}`}
                                            readOnly={col === 0}
                                            disabled={disabledDays.users.includes(day - 1)}
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
                                        value={tableData.users.daily.reduce((sum, row, index) => disabledDays.users.includes(index) ? sum : sum + row[col], 0)}
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
                                        value={tableData.users.initial[col] + tableData.users.daily.reduce((sum, row, index) => disabledDays.users.includes(index) ? sum : sum + row[col], 0)}
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