import React, { useState } from 'react';
import { supabase } from '@/supabaseClient';
import Client from '@/interfaces/client';



interface Props {
    client: Client;
}

const ClientInfo: React.FC<Props> = ({ client }) => {
    const [email, setEmail] = useState(client.email);
    const [name, setName] = useState(client.name);
    const [phoneNumber, setPhoneNumber] = useState(client.phone_number);
    const [metodoPreferido, setMetodoPreferido] = useState<'Retiro en Sitio' | 'Domicilio'>(client.metodo_preferido);


    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
            Cliente:<h2 className="text-xl font-bold mb-4">{name}</h2>
            <div className="flex flex-row justify-evenly">
                <p className="mr-3">Número de Teléfono: <strong>{phoneNumber}</strong></p>
                <p className="mr-3">Email: <strong>{email}</strong></p>
                <p className="mr-3">Método Preferido de Entrega: <strong>{metodoPreferido}</strong></p>
            </div>

        </div>
    );
};

export default ClientInfo;
