import React from 'react';
import { useUserStore } from '@/store/user.store';
import { Link } from 'react-router-dom';
import { LuPackagePlus } from "react-icons/lu";

const Home: React.FC = () => {
  const { user } = useUserStore();
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Bienvenido {user?.name} al Admin Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/packages">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center text-center">
            <LuPackagePlus className="text-4xl text-blue-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Registro de Paquetes</h2>
            <p className="text-gray-600">Registro de compras en línea y encomiendas.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
