import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import ClientForm from './ClientForm';
import EditClientModal from './EditClientModal';
import Modal from '@/components/Modal';
import { DataTable } from "@/components/DataTable";
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";

import { ColumnDef } from "@tanstack/react-table"


interface Client {
    id: string;
    email: string;
    name: string;
    created_by: string;
    phone_number: string;
    metodo_preferido: 'En sitio' | 'Domicilio';
}

const Clients: React.FC = () => {

    const columns: ColumnDef<Client>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nombre
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            /*SERVIRÁ PARA FORMATEAR VALORES
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("amount"))
                const formatted = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(amount)
           
                return <div className="text-right font-medium">{formatted}</div>
              },*/
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "phone_number",
            header: "Teléfono",
        },
        {
            accessorKey: "metodo_preferido",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Pref. Entrega
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                let client = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='rounded-md border bg-white shadow-md' align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem className='hover:bg-gray-200'
                                onClick={() => handleEditClick(client)}
                            >
                                Editar
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='hover:bg-gray-200'
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Ver Direcciones
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-200'
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Ver Pedidos
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const [clients, setClients] = useState<Client[]>([]);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isClientModalOpen, setClientModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = clients.filter(row =>
        row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.metodo_preferido.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openClientModal = () => {
        setClientModalOpen(true);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        const { data, error } = await supabase.from<Client>('Clients').select('*').order('name', { ascending: true });
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

    const closeClientModal = () => {
        setClientModalOpen(false);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Gestión de Clientes</h1>
            <button
                onClick={openClientModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Agregar Cliente
            </button>
            <Modal isOpen={isClientModalOpen} onClose={closeClientModal}>
                <ClientForm onClose={closeClientModal} onClientAdded={fetchClients} />
            </Modal>

            <div className="container mx-auto py-10">
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <DataTable columns={columns} data={filteredData} />
            </div>
            {isEditModalOpen && selectedClient && (
                <EditClientModal client={selectedClient} onClose={handleModalClose} />
            )}
            { }
        </div>


    );
};

export default Clients;
