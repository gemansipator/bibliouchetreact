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
        <div className="app-container flex flex-col h-screen bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-center flex-grow text-blue-800 dark:text-blue-200">Дневник детской библиотеки (детского отделения)</h1>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-blue-200 dark:bg-gray-700 hover:bg-blue-300 dark:hover:bg-gray-600 transition-colors shadow-md"
                >
                    <i className={`fas ${theme === 'light-theme' ? 'fa-moon' : 'fa-sun'} text-yellow-500 dark:text-yellow-300`}></i>
                </button>
            </div>
            <nav className="flex justify-center p-4 space-x-6 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 shadow">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-colors'} font-semibold`}
                >
                    Пользователи
                </button>
                <button
                    onClick={() => setActiveTab('visits')}
                    className={`px-4 py-2 rounded-lg ${activeTab === 'visits' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white transition-colors'} font-semibold`}
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