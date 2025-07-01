import React, { useContext, useEffect, useRef } from 'react';
import { TableContext } from '../App';
import './ServiceTable.css';

function ServiceTable({ theme }) {
    const { tableData, setTableData, disabledDays, setDisabledDays, clearTableData } = useContext(TableContext);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const columnCount = 61;

    const calculateColumn1 = (rowIndex) => {
        if (disabledDays.service.includes(rowIndex)) return 0;
        return tableData.service.daily[rowIndex].slice(6, columnCount).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
    };

    const handleInputChange = (row, col, value) => {
        const newValue = value === '' ? 0 : parseInt(value) || 0;
        setTableData(prev => ({
            ...prev,
            service: {
                ...prev.service,
                [row === 'initial' ? 'initial' : 'daily']: row === 'initial'
                    ? [...prev.service.initial].map((v, i) => i === col ? newValue : v)
                    : prev.service.daily.map((r, i) => i === row ? [...r].map((v, j) => j === col ? newValue : v) : r)
            }
        }));
        if (row !== 'initial') {
            setTableData(prev => ({
                ...prev,
                service: {
                    ...prev.service,
                    daily: prev.service.daily.map((r, i) => i === row ? [...r].map((v, j) => j === 0 ? calculateColumn1(row) : v) : r)
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
                        service: prev.service.includes(day) ? prev.service.filter(d => d !== day) : [...prev.service, day]
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
            if (this.value === '0' && !disabledDays.service.includes(parseInt(this.dataset.index.split('-')[0]))) {
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
            service: {
                ...prev.service,
                daily: prev.service.daily.map((row, index) => [...row].map((v, j) => j === 0 ? (disabledDays.service.includes(index) ? 0 : calculateColumn1(index)) : v))
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
    }, [disabledDays.service, tableData.service.daily]);

    return (
        <div className={`p-4 ${theme}`}>
            <h2 className="text-2xl font-bold text-center mb-4 flex justify-between items-center">
                Библиотечно-информационное обслуживание пользователей за [месяц] [год]
                <button
                    onClick={() => clearTableData('service')}
                    className="clear-button"
                >
                    Очистить таблицу
                </button>
            </h2>
            <div className="table-wrapper">
                <div className="table-container">
                    <table className="service-table">
                        <thead className="sticky-header">
                        <tr className="header">
                            <th className="sticky-col-1" rowSpan="3">Число месяца</th>
                            <th className="sticky-col-2" colSpan="6">Число зарегистрированных пользователей библиотеки</th>
                            <th colSpan="55">Отдельные группы пользователей</th>
                        </tr>
                        <tr className="header">
                            <th className="sticky-col-2" rowSpan="2">Всего</th>
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
                            {Array.from({ length: 41 }, (_, i) => (
                                <th key={`extra-${i}`} rowSpan="2">{`Доп. ${i + 1}`}</th>
                            ))}
                        </tr>
                        <tr className="header">
                            <th>Всего</th>
                            <th>В т.ч. дети до 14 (из гр.3)</th>
                            <th>В т.ч. РДЧ (из гр.3)</th>
                        </tr>
                        <tr className="header">
                            <th className="sticky-col-1">1</th>
                            {Array.from({ length: columnCount }, (_, i) => (
                                <th key={i} className={i === 0 ? 'sticky-col-2' : ''}>{i + 2}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="sticky-col-1 day-cell">Состоит к началу месяца</td>
                            {Array.from({ length: columnCount }, (_, col) => (
                                <td key={col} className={col === 0 ? 'sticky-col-2' : ''}>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        defaultValue={tableData.service.initial[col]}
                                        className="table-input"
                                        data-index={`initial-${col}`}
                                        onChange={(e) => handleInputChange('initial', col, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                        {days.map(day => (
                            <tr key={day} className={disabledDays.service.includes(day - 1) ? 'disabled-row' : ''}>
                                <td className={`sticky-col-1 day-cell ${disabledDays.service.includes(day - 1) ? 'disabled-day' : ''}`}>{day}</td>
                                {Array.from({ length: columnCount }, (_, col) => (
                                    <td key={col} className={col === 0 ? 'sticky-col-2' : ''}>
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={tableData.service.daily[day - 1][col]}
                                            className={`table-input ${disabledDays.service.includes(day - 1) ? 'disabled-input' : ''}`}
                                            data-index={`${day - 1}-${col}`}
                                            readOnly={col === 0}
                                            disabled={disabledDays.service.includes(day - 1)}
                                            onChange={(e) => col !== 0 && handleInputChange(day - 1, col, e.target.value)}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td className="sticky-col-1 day-cell">Всего за месяц</td>
                            {Array.from({ length: columnCount }, (_, col) => (
                                <td key={col} className={col === 0 ? 'sticky-col-2' : ''}>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={tableData.service.daily.reduce((sum, row, index) => disabledDays.service.includes(index) ? sum : sum + row[col], 0)}
                                        className="table-input"
                                        readOnly
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="sticky-col-1 day-cell">Итого с начала года</td>
                            {Array.from({ length: columnCount }, (_, col) => (
                                <td key={col} className={col === 0 ? 'sticky-col-2' : ''}>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={tableData.service.initial[col] + tableData.service.daily.reduce((sum, row, index) => disabledDays.service.includes(index) ? sum : sum + row[col], 0)}
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

export default ServiceTable;