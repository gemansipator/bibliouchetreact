import React from 'react';
import UsersTable from './components/UsersTable';
import VisitsTable from './components/VisitsTable';

function App() {
  const [activeTab, setActiveTab] = React.useState('users');

  return (
      <div className="min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 p-4 bg-gray-200 text-center">БиблиоУчёт</h1>
        <div className="flex justify-center p-4 space-x-4">
          <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-500`}
          >
            Пользователи
          </button>
          <button
              onClick={() => setActiveTab('visits')}
              className={`px-4 py-2 rounded ${activeTab === 'visits' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-blue-500`}
          >
            Посещения
          </button>
        </div>
        <div className="p-4">
          {activeTab === 'users' ? <UsersTable /> : <VisitsTable />}
        </div>
      </div>
  );
}

export default App;