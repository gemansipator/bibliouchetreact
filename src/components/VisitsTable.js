import React, { useEffect } from 'react';
import './VisitsTable.css';

function VisitsTable({ theme }) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    useEffect(() => {
        const inputs = document.querySelectorAll('.table-input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                const value = this.value.trim();
                if (!/^\d+$/.test(value) || value === '') {
                    this.value = '0';
                }
            });
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
                            <th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th>
                            <th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="day-cell">Состоит к началу месяца</td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                        </tr>
                        {days.map(day => (
                            <tr key={day}>
                                <td className="day-cell">{day}</td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                                <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                    const value = e.target.value.trim();
                                    if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                                }} /></td>
                            </tr>
                        ))}
                        <tr>
                            <td className="day-cell">Всего за месяц</td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                        </tr>
                        <tr>
                            <td className="day-cell">Итого с начала года</td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                            <td><input type="number" min="0" step="1" defaultValue="0" className="table-input" onBlur={e => {
                                const value = e.target.value.trim();
                                if (!/^\d+$/.test(value) || value === '') e.target.value = '0';
                            }} /></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default VisitsTable;