import React, { useState, useEffect } from 'react';
import UsersTable from './components/UsersTable';
import VisitsTable from './components/VisitsTable';

function App() {
    const [activeTab, setActiveTab] = useState('users');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark-theme');

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark-theme' ? 'light-theme' : 'dark-theme');
    };

    return (
        <div className="min-h-screen">
            <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <h1 className="text-3xl font-bold">БиблиоУчёт</h1>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                    <i className={`fas ${theme === 'dark-theme' ? 'fa-sun' : 'fa-moon'}`}></i>
                </button>
            </div>
            <div className="flex justify-center p-4 space-x-4">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-500 transition-colors`}
                >
                    Пользователи
                </button>
                <button
                    onClick={() => setActiveTab('visits')}
                    className={`px-4 py-2 rounded ${activeTab === 'visits' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-500 transition-colors`}
                >
                    Посещения
                </button>
            </div>
            <div className="p-4">
                {activeTab === 'users' ? <UsersTable theme={theme} /> : <VisitsTable theme={theme} />}
            </div>
        </div>
    );
}

export default App;