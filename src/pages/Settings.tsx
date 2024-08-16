import CardCategory from '@/components/ui/CardCategory';
import React from 'react';
import { FaUserCog, FaBoxOpen, FaTruck, FaSuitcaseRolling, FaUserFriends } from 'react-icons/fa';

const Settings: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Configuración</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <CardCategory redirectTo="/settings/users">
                    <CardCategory.Icon>
                        <FaUserCog className='text-blue-500'/>
                    </CardCategory.Icon>
                    <CardCategory.Title>Usuarios y Permisos</CardCategory.Title>
                    <CardCategory.Description>Gestiona los usuarios de la plataforma junto a sus roles y permisos.</CardCategory.Description>
                </CardCategory>

                <CardCategory redirectTo="/categories/categories">
                    <CardCategory.Icon>
                        <FaBoxOpen className='text-yellow-500'/>
                    </CardCategory.Icon>
                    <CardCategory.Title>Categorías de Productos</CardCategory.Title>
                    <CardCategory.Description>Configura las categorías de productos.</CardCategory.Description>
                </CardCategory>

                <CardCategory redirectTo="/settings/delivery-routes">
                    <CardCategory.Icon>
                        <FaTruck className='text-red-500'/>
                    </CardCategory.Icon>
                    <CardCategory.Title>Rutas de Entrega</CardCategory.Title>
                    <CardCategory.Description>Gestiona las rutas de entrega disponibles en cada país.</CardCategory.Description>
                </CardCategory>

                <CardCategory redirectTo="/settings/maletas">
                    <CardCategory.Icon>
                        <FaSuitcaseRolling className='text-gray-500'/>
                    </CardCategory.Icon>
                    <CardCategory.Title>Maletas</CardCategory.Title>
                    <CardCategory.Description>Gestiona información de las maletas (Dimensiones, Peso Tara y Peso Máximo).</CardCategory.Description>
                </CardCategory>


                <CardCategory redirectTo="/settings/viajeros">
                    <CardCategory.Icon>
                        <FaUserFriends className='text-green-500'/>
                    </CardCategory.Icon>
                    <CardCategory.Title>Viajeros</CardCategory.Title>
                    <CardCategory.Description>Gestiona información de los viajeros (Nombre, Apellido, Documento, etc).</CardCategory.Description>
                </CardCategory>

            </div>
        </div>
    );
};

export default Settings;
