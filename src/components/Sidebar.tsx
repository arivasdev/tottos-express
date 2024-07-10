import React from 'react';

const Sidebar: React.FC = () => {
    return (
      <div className="bg-gray-800 text-white w-64 h-full flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700">Dashboard</li>
            <li className="p-4 hover:bg-gray-700">Users</li>
            <li className="p-4 hover:bg-gray-700">Settings</li>
          </ul>
        </nav>
      </div>
    );
  };

export default Sidebar;
