import React, { useState, useEffect } from 'react';
import UsersTable from './components/UsersTable';
import VisitsTable from './components/VisitsTable';

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
        <div className="app-container">
            <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white">
                <h1 className="text-3xl font-bold">Дневник детской библиотеки (детского отделения)</h1>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                    <i className={`fas ${theme === 'light-theme' ? 'fa-moon' : 'fa-sun'}`}></i>
                </button>
            </div>
            <nav className="flex justify-center p-4 space-x-6">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} hover:bg-blue-500 transition-colors`}
                >
                    Пользователи
                </button>
                <button
                    onClick={() => setActiveTab('visits')}
                    className={`px-4 py-2 rounded ${activeTab === 'visits' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'} hover:bg-blue-500 transition-colors`}
                >
                    Посещения
                </button>
            </nav>
            <div className="p-4 flex-grow">
                {activeTab === 'users' ? <UsersTable theme={theme} /> : <VisitsTable theme={theme} />}
            </div>
        </div>
    );
}

export default App;