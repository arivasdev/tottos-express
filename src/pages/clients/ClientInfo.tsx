import React from 'react';
import { Client } from '@/interfaces/client';
import { FaPhoneAlt, FaEnvelope, FaTruck } from 'react-icons/fa';


interface Props {
    client: Client;
}

const ClientInfo: React.FC<Props> = ({ client }) => {
    const { name, email, phone_number: phoneNumber, metodo_preferido: metodoPreferido } = client;

    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">{name}</h2>
            <div className="flex flex-row justify-evenly">
                <div className="mb-4">
                    <div className="flex items-center">
                        <FaPhoneAlt className="mr-2" />{phoneNumber}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center">
                        <FaEnvelope className="mr-2" />{email}
                    </div>
                </div>
                <div className="mb-4">
                    <div className="flex items-center">
                        <FaTruck className="mr-2" />{metodoPreferido}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ClientInfo;
