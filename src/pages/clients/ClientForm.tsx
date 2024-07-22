import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

interface Props {
  onClientAdded: () => void;
  onClose: () => void;
}

const ClientForm: React.FC<Props> = ({ onClientAdded, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [metodoPreferido, setMetodoPreferido] = useState<'Retiro en Sitio' | 'Domicilio'>('Retiro en Sitio');
  const [currentUserId, setCurrentUserId] = useState('');

  const { toast } = useToast()

  useEffect(() => {
    getSession()
  }, [])

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data) {
      getUserId(data.session?.user.id!)
      setCurrentUserId(data.session?.user.id!)
    }

  };

  const getUserId = async (userGuid: string) => {
    const { data } = await supabase.from("Users").select("id").eq("user_UID", userGuid);
    if (data) {
      setCurrentUserId(data[0].id);
    }
  }
  const addClient = async () => {
    if (email.trim() && name.trim() && phoneNumber.trim()) {
      const { error } = await supabase.from('Clients').insert({
        email,
        name,
        created_by: currentUserId,
        phone_number: phoneNumber,
        metodo_preferido: metodoPreferido,
      });

      if (error) {
        console.error('Error adding client:', error);
        toast({
          title: "Ocurrió un error agregando el Cliente",
          duration: 3000,
          className: "bg-red-200"
        })
      } else {
        setEmail('');
        setName('');
        setPhoneNumber('');
        setMetodoPreferido('Retiro en Sitio');
        onClientAdded();
        onClose();

        toast({
          title: "Cliente Agregado Correctamente",
          duration: 3000,
          className: "bg-green-200"
        })
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Agregar Nuevo Cliente</h2>
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Método Preferido de Entrega</label>
        <select
          value={metodoPreferido}
          onChange={(e) => setMetodoPreferido(e.target.value as 'Retiro en Sitio' | 'Domicilio')}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Retiro en Sitio">Retiro en Sitio</option>
          <option value="Domicilio">Domicilio</option>
        </select>
      </div>
      <span className='float-right'>
        <button
          onClick={onClose}
          className="btn-dark"
        >
          Descartar
        </button>
        <button
          onClick={addClient}
          className="btn-success"
        >
          Agregar Cliente
        </button>

      </span>
    </div>
  );
};

export default ClientForm;
