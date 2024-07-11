import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const [openOption, setOpenOption] = useState("");



    return (
        <div className="bg-gray-800 text-white w-64 h-full flex flex-col">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1">
                <ul>
                    <li onClick={() => setOpenOption("/")} className="p-4 hover:bg-gray-700">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li onClick={() => setOpenOption("/users")} className="p-4 hover:bg-gray-700">
                        <Link to="/users">Users</Link>
                    </li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => { setOpenOption("/settings") }}>
                        <Link to="/settings">Configuración</Link>
                    </li>
                    <div
                        className={`pl-4 overflow-hidden transition-all duration-500 ease-in-out ${openOption === "/settings" ? 'max-h-40' : 'max-h-0'
                            }`}
                    >
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/settings/users">Usuarios</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/settings/roles">Asignación de Roles</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/settings/categories">Categorías de Productos</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/settings/delivery-methods">Métodos de Entrega</Link>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
