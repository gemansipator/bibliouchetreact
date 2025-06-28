import React from 'react';
import './VisitsTable.css';

function VisitsTable({ theme }) {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className={`p-2 ${theme} flex flex-col h-full`}>
            <h2 className="text-2xl font-bold text-center mb-4">Число посещений библиотеки за [месяц] [год]</h2>
            <div className="table-wrapper flex-grow">
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
                            <td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td>
                            <td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td className="day-cell">Состоит к началу месяца</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                        {days.map(day => (
                            <tr key={day}><td className="day-cell">{day}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                        ))}
                        <tr><td className="day-cell">Всего за месяц</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                        <tr><td className="day-cell">Итого с начала года</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default VisitsTable;