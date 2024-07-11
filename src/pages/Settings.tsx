import React from 'react';
import { FaUsers, FaUserTag, FaBoxOpen, FaTruck } from 'react-icons/fa';

const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <FaUsers className="text-4xl text-blue-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Usuarios</h2>
          <p className="text-gray-600">Gestiona los usuarios de la plataforma.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <FaUserTag className="text-4xl text-green-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Asignación de Roles</h2>
          <p className="text-gray-600">Administra los roles y permisos.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <FaBoxOpen className="text-4xl text-yellow-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Categorías de Productos</h2>
          <p className="text-gray-600">Configura las categorías de productos.</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
          <FaTruck className="text-4xl text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Métodos de Entrega</h2>
          <p className="text-gray-600">Gestiona los métodos de entrega disponibles.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
