import React, { useState, useEffect, createContext } from 'react';
import UsersTable from './components/UsersTable';
import VisitsTable from './components/VisitsTable';
import ServiceTable from './components/ServiceTable';
import './App.css';

export const TableContext = createContext();

function App() {
    const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'users');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light-theme');
    const [tableData, setTableData] = useState({
        users: JSON.parse(localStorage.getItem('tableData_users')) || { initial: Array(20).fill(0), daily: Array.from({ length: 31 }, () => Array(20).fill(0)) },
        visits: JSON.parse(localStorage.getItem('tableData_visits')) || { initial: Array(21).fill(0), daily: Array.from({ length: 31 }, () => Array(21).fill(0)) },
        service: JSON.parse(localStorage.getItem('tableData_service')) || { initial: Array(61).fill(0), daily: Array.from({ length: 31 }, () => Array(61).fill(0)) },
    });
    const [disabledDays, setDisabledDays] = useState({
        users: JSON.parse(localStorage.getItem('disabledDays_users')) || [],
        visits: JSON.parse(localStorage.getItem('disabledDays_visits')) || [],
        service: JSON.parse(localStorage.getItem('disabledDays_service')) || [],
    });

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
        localStorage.setItem('activeTab', activeTab);
        localStorage.setItem('tableData_users', JSON.stringify(tableData.users));
        localStorage.setItem('tableData_visits', JSON.stringify(tableData.visits));
        localStorage.setItem('tableData_service', JSON.stringify(tableData.service));
        localStorage.setItem('disabledDays_users', JSON.stringify(disabledDays.users));
        localStorage.setItem('disabledDays_visits', JSON.stringify(disabledDays.visits));
        localStorage.setItem('disabledDays_service', JSON.stringify(disabledDays.service));
    }, [theme, activeTab, tableData, disabledDays]);

    const toggleTheme = () => {
        setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
    };

    const clearTableData = (tableName) => {
        setTableData(prev => ({
            ...prev,
            [tableName]: { initial: Array(tableName === 'users' ? 20 : tableName === 'visits' ? 21 : 61).fill(0), daily: Array.from({ length: 31 }, () => Array(tableName === 'users' ? 20 : tableName === 'visits' ? 21 : 61).fill(0)) }
        }));
        setDisabledDays(prev => ({
            ...prev,
            [tableName]: []
        }));
    };

    return (
        <TableContext.Provider value={{ tableData, setTableData, disabledDays, setDisabledDays, clearTableData }}>
            <div className={`app-container ${theme}`}>
                <header className="app-header">
                    <h1 className="app-title">
                        Дневник детской библиотеки <br className="md-hidden" /> (детского отделения)
                    </h1>
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Сменить тему"
                    >
                        <i className={`fas ${theme === 'light-theme' ? 'fa-moon' : 'fa-sun'}`}></i>
                    </button>
                </header>

                <nav className="app-nav">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`nav-button ${activeTab === 'users' ? 'active' : ''}`}
                    >
                        Пользователи
                    </button>
                    <button
                        onClick={() => setActiveTab('visits')}
                        className={`nav-button ${activeTab === 'visits' ? 'active' : ''}`}
                    >
                        Посещения
                    </button>
                    <button
                        onClick={() => setActiveTab('service')}
                        className={`nav-button ${activeTab === 'service' ? 'active' : ''}`}
                    >
                        Обслуживание
                    </button>
                </nav>

                <main className="app-main">
                    {activeTab === 'users' ? <UsersTable theme={theme} /> : activeTab === 'visits' ? <VisitsTable theme={theme} /> : <ServiceTable theme={theme} />}
                </main>
            </div>
        </TableContext.Provider>
    );
}

export default App;