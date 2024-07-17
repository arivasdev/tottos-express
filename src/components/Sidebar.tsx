import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { FaUserCog, FaChevronDown, FaChevronRight, FaTruck } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { MdCardTravel } from "react-icons/md";

const Sidebar: React.FC = () => {
    const [openOption, setOpenOption] = useState("");
    const [configOpen, setConfigOpen] = useState(false);



    return (
        <div className="bg-gray-800 text-white w-50 h-full flex flex-col">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1">
                <ul>
                    <li onClick={() => setOpenOption("/")} className="p-4 hover:bg-gray-700">
                        <Link to="/">Inicio</Link>
                    </li>
                    <li onClick={() => setOpenOption("/clients")} className="p-4 hover:bg-gray-700">
                        <Link to="/clients">Clientes</Link>
                    </li>
                    <li className="m-1"></li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => { setOpenOption("/settings"); setConfigOpen(!configOpen) }}>
                        <Link to="/settings"  className='flex items-center'>{configOpen ? <FaChevronDown className='mr-2'/> : <FaChevronRight className='mr-2'/>}<strong>Configuración</strong></Link>
                    </li>
                    <div
                        className={`pl-4 overflow-hidden transition-all duration-500 ease-in-out ${configOpen ? 'max-h-40' : 'max-h-0'
                            }`}
                    >
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/settings/users"  className='flex items-center justify-start'><FaUserCog className='mr-2'/> Usuarios y Permisos</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/categories/categories" className='flex items-center justify-start'><BiCategory  className='mr-2'/> Categorías de Productos</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/settings/delivery-routes"className='flex items-center justify-start'><FaTruck  className='mr-2'/> Rutas de Entrega</Link>
                        </li>
                        <li className="p-2 hover:bg-gray-700">
                            <Link to="/settings/travelers"className='flex items-center justify-start'><MdCardTravel  className='mr-2'/>Viajeros</Link>
                        </li>
                    </div>

                </ul>
            </nav>
            <div className="p-4 hover:bg-gray-700">
                <button onClick={() => supabase.auth.signOut()}>Cerrar Sesión</button>
            </div>
        </div>
    );
};

export default Sidebar;
