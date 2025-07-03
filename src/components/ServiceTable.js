import React, { useContext, useEffect, useRef, useState } from 'react';
import { TableContext } from '../App';
import './ServiceTable.css';

/**
 * Компонент таблицы для учета библиотечно-информационного обслуживания пользователей
 * @param {Object} props - Свойства компонента
 * @param {string} props.theme - Тема оформления (светлая/темная)
 */
function ServiceTable({ theme }) {
    const {
        tableData,
        setTableData,
        disabledDays,
        setDisabledDays,
        clearTableData
    } = useContext(TableContext);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const columnCount = 63;

    /**
     * Вычисляет сумму значений для первой колонки (итого за день)
     * @param {number} rowIndex - Индекс строки (день месяца)
     * @returns {number} Сумма значений с 25 по 35 колонку
     */
    const calculateColumn1 = (rowIndex) => {
        if (disabledDays.service.includes(rowIndex)) return 0;
        return tableData.service.daily[rowIndex].slice(24, 37).reduce((sum, val) => sum + (parseInt(val) || 0), 0);
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

    /**
     * Очищает значения строки "Состоит к началу месяца" (initial)
     */
    const clearInitialData = () => {
        console.log('Очистка начальных данных для ServiceTable');
        setTableData(prev => ({
            ...prev,
            service: {
                ...prev.service,
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
                        service: prev.service.includes(day)
                            ? prev.service.filter(d => d !== day)
                            : [...prev.service, day]
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
                <div>Библиотечно-информационное обслуживание пользователей за месяц и год</div>
                <button
                    onClick={() => clearTableData('service')}
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
                    <table className="service-table">
                        <thead className="sticky-header">
                        <tr className="header">
                            <th className="sticky-col-1"></th>
                            <th colSpan="4"></th>
                            <th colSpan="2"></th>
                            <th colSpan="18">Выдано (просмотрено) документов из фондов библиотеки</th>
                            <th colSpan="13">В том числе выдано: распределение литературы по содержанию</th>
                            <th colSpan="3">Выдано документов в стационаном режиме</th>
                            <th colSpan="4">Причины спроса</th>
                            <th colSpan="9">Выдано (просмотрено) документов из фондов других библиотек</th>
                            <th colSpan="5">Изготовлено для пользователей и выдано копий, единиц</th>
                            <th colSpan="5">Выполнено справок и консультаций, единиц</th>
                        </tr>
                        <tr className="header">
                            <th className="sticky-col-1" rowSpan="3">Число месяца</th>
                            <th className="sticky-col-3" colSpan="1"></th>
                            <th className="sticky-col-3" colSpan="3">В стационарном режиме</th>
                            <th className="sticky-col-3" colSpan="2"></th>
                            <th className="sticky-col-3" colSpan="5">В т. ч. из фонда на физических носителях (из гр.
                                2)
                            </th>
                            <th className="sticky-col-3" colSpan="5">В т. ч. из электронной (цифровой) библиотеки (из
                                гр. 2)
                            </th>
                            <th className="sticky-col-3" colSpan="3">В т. ч. инсталлир. документов (из гр. 2)</th>
                            <th className="sticky-col-3" colSpan="5">В т. ч. сетевых удал. лицензион. док. (из гр. 2)
                            </th>
                            <th className="sticky-col-3" colSpan="4"></th>
                            <th colSpan="3">Социальные гуманитарные науки</th>
                            <th colSpan="6"></th>
                            <th colSpan="3"></th>
                            <th colSpan="4"></th>
                            <th colSpan="3"></th>
                            <th colSpan="3">В т.ч. полученных по системе МБА и ММБА (из гр. 43)</th>
                            <th colSpan="3">Доступных в виртуальных читальных залах (из гр. 43)</th>
                            <th colSpan="1"></th>
                            <th colSpan="3">В стационарном режиме</th>
                            <th colSpan="1"></th>
                            <th colSpan="1"></th>
                            <th colSpan="3">В стационарном режиме</th>
                            <th colSpan="1"></th>
                        </tr>
                        <tr className="header">
                            <th className="sticky-col-2" rowSpan="2">Всего</th>
                            <th colSpan="3">В том числе</th>
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
                            <th rowSpan="2">Доп</th>
                            <th rowSpan="2">Доп</th>
                            <th rowSpan="2">Доп</th>
                            <th rowSpan="2">Доп</th>
                            <th rowSpan="2">Естеств. науки (2)</th>
                            <th rowSpan="2">Техника (3)</th>
                            <th rowSpan="2">Сельское и лесное хозяйство (4)</th>
                            <th rowSpan="2">Здравоохранение, медицинские науки (5)</th>
                            <th rowSpan="2">60, 65, 66, 67, 68</th>
                            <th rowSpan="2">История (63)</th>
                            <th rowSpan="2">Краеведение</th>
                            <th rowSpan="2">Культура, наука (71, 72, 74, 75, 76, 77, 78, 79)</th>
                            <th rowSpan="2">Филогические науки (80, 81, 82, 83)</th>
                            <th rowSpan="2">Худ. литература (84)</th>
                            <th rowSpan="2">Искусство (85)</th>
                            <th rowSpan="2">Религия, философия, психология (86, 87, 88)</th>
                            <th rowSpan="2">Литература универсального содержания (9)</th>
                            <th rowSpan="2">Дошкольникам</th>
                            <th rowSpan="2">Инвалидам</th>
                            <th rowSpan="2">РДЧ</th>
                            <th rowSpan="2">В помощь шк. программам</th>
                            <th rowSpan="2">Личный интерес</th>
                            <th rowSpan="2">Книжные выставки</th>
                            <th rowSpan="2">Рекомендации библиотекаря</th>
                            <th rowSpan="2">В стационарном режиме</th>
                            <th rowSpan="2">В т.ч. детям до 14 лет</th>
                            <th rowSpan="2">В т.ч. РДЧ</th>
                            <th rowSpan="2">В стационарном режиме</th>
                            <th rowSpan="2">В т.ч. детям до 14 лет включительно</th>
                            <th rowSpan="2">В т.ч. РДЧ</th>
                            <th rowSpan="2">В стационарном режиме</th>
                            <th rowSpan="2">В т.ч. детям до 14 лет включительно</th>
                            <th rowSpan="2">В т.ч. РДЧ</th>
                            <th rowSpan="2">Всего</th>
                            <th rowSpan="2">Всего</th>
                            <th rowSpan="2">В т.ч. детям до 14 лет включительно</th>
                            <th rowSpan="2">В т.ч. РДЧ</th>
                            <th rowSpan="2">В удаленном режиме</th>
                            <th rowSpan="2">Всего</th>
                            <th rowSpan="2">Всего</th>
                            <th rowSpan="2">В т.ч. детям до 14 лет включительно</th>
                            <th rowSpan="2">В т.ч. РДЧ</th>
                            <th rowSpan="2">В удаленном режиме</th>

                        </tr>
                        <tr className="header">
                            <th>Всего</th>
                            <th>В т.ч. дети до 14 (из гр.3)</th>
                            <th>В т.ч. РДЧ (из гр.3)</th>
                        </tr>
                        <tr className="header">
                            <th className="sticky-col-1">1</th>
                            <th className="sticky-col-2">2</th>
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
                            <th>23</th>
                            <th>24</th>
                            <th>25 (1)</th>
                            <th>25 (2)</th>
                            <th>26</th>
                            <th>27</th>
                            <th>28</th>
                            <th>29</th>
                            <th>30</th>
                            <th>empty</th>
                            <th>31</th>
                            <th>32</th>
                            <th>33</th>
                            <th>34</th>
                            <th>35</th>
                            <th>36</th>
                            <th>37</th>
                            <th>38</th>
                            <th>39</th>
                            <th>40</th>
                            <th>41</th>
                            <th>42</th>
                            <th>43</th>
                            <th>44</th>
                            <th>45</th>
                            <th>46</th>
                            <th>47</th>
                            <th>48</th>
                            <th>49</th>
                            <th>50</th>
                            <th>51</th>
                            <th>52</th>
                            <th>53</th>
                            <th>54</th>
                            <th>55</th>
                            <th>56</th>
                            <th>57</th>
                            <th>58</th>
                            <th>59</th>
                            <th>60</th>
                            <th>61</th>
                            <th>62</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="sticky-col-1 day-cell">Состоит к началу месяца</td>
                            {Array.from({length: columnCount}, (_, col) => (
                                <td key={col} className={col === 0 ? 'sticky-col-2' : ''}>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={tableData.service.initial[col]}
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
                                        value={tableData.service.daily.reduce((sum, row, index) =>
                                            disabledDays.service.includes(index) ? sum : sum + row[col], 0)}
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
                                        value={tableData.service.initial[col] +
                                            tableData.service.daily.reduce((sum, row, index) =>
                                                disabledDays.service.includes(index) ? sum : sum + row[col], 0)}
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