import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
      <div className="bg-gray-800 text-white w-64 h-full flex flex-col">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1">
          <ul>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/users">Users</Link>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/settings">Configuración</Link>
          </li>
          </ul>
        </nav>
      </div>
    );
  };

export default Sidebar;
