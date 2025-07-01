import React, { useState, useEffect } from 'react';
import UsersTable from './components/UsersTable';
import VisitsTable from './components/VisitsTable';
import ServiceTable from './components/ServiceTable';
import './App.css';

function App() {
    const [activeTab, setActiveTab] = useState('users');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light-theme');

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');
    };

    return (
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
    );
}

export default App;