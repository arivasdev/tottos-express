import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import ClientForm from './ClientForm';
import EditClientModal from './EditClientModal';

interface Client {
  id: string;
  email: string;
  name: string;
  created_by: string;
  phone_number: string;
  metodo_preferido: 'En sitio' | 'Domicilio';
}

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase.from<Client>('Clients').select('*');
    if (error) {
      console.error('Error fetching clients:', error);
    } else {
      setClients(data || []);
    }
  };

  const handleEditClick = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedClient(null);
    fetchClients();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
      <ClientForm onClientAdded={fetchClients} />
      <div className="grid grid-cols-1 gap-4 mt-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{client.name}</h2>
              <p>Email: {client.email}</p>
              <p>Teléfono: {client.phone_number}</p>
              <p>Método Preferido: {client.metodo_preferido}</p>
            </div>
            <button
              onClick={() => handleEditClick(client)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
      {isEditModalOpen && selectedClient && (
        <EditClientModal client={selectedClient} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default Clients;
