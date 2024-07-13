import React, { useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useToast } from "@/components/ui/use-toast"

interface Client {
  id: string;
  email: string;
  name: string;
  created_by: string;
  phone_number: string;
  metodo_preferido: 'En sitio' | 'Domicilio';
}

interface Props {
  client: Client;
  onClose: () => void;
}

const EditClientModal: React.FC<Props> = ({ client, onClose }) => {
  const [email, setEmail] = useState(client.email);
  const [name, setName] = useState(client.name);
  const [phoneNumber, setPhoneNumber] = useState(client.phone_number);
  const [metodoPreferido, setMetodoPreferido] = useState<'Retiro en Sitio' | 'Domicilio'>(client.metodo_preferido);
  const { toast } = useToast()

  const updateClient = async () => {
    const { error } = await supabase
      .from('Clients')
      .update({
        email,
        name,
        phone_number: phoneNumber,
        metodo_preferido: metodoPreferido,
      })
      .eq('id', client.id);

    if (error) {
      console.error('Error updating client:', error);
      toast({
        title: "Ocurrió un error actualizando el cliente",
        duration: 3000,
        className: "bg-red-200"
      })
    } else {

      toast({
        title: "Cliente Actualizado Correctamente",
        duration: 3000,
        className: "bg-green-200"
      })
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Método Preferido</label>
          <select
            value={metodoPreferido}
            onChange={(e) => setMetodoPreferido(e.target.value as 'Retiro en Sitio' | 'Domicilio')}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Retiro en Sitio">Retiro en Sitio</option>
            <option value="Domicilio">Domicilio</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={updateClient}
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditClientModal;
