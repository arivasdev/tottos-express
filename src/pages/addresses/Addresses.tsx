import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import AddressForm from './AddressForm';
import EditAddressModal from './EditAddressModal';
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
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Badge } from "@/components/ui/badge"


import { ColumnDef } from "@tanstack/react-table"
import Client from '@/interfaces/client';
import ClientInfo from '../clients/ClientInfo';
import { useLocation } from 'react-router-dom';


interface Address {
    id: string;
    email: string;
    Address_id: string;
    country_id: string;
    rounte_id: string;
    address: string;
    isActive: boolean;
}
const Addresses: React.FC = () => {

    const location = useLocation<{ row: Client }>();
    const { row } = location.state;
    const columns: ColumnDef<Address>[] = [
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
            cell: ({ row }) => {
                const metodo = row.getValue("metodo_preferido")

                return <Badge className={metodo == "Retiro en Sitio" ? "bg-teal-300" : "bg-yellow-200"} variant="outline">{metodo}</Badge>
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                let Address = row.original;

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
                                onClick={() => handleEditClick(Address)}
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

    const [Addresses, setAddresss] = useState<Address[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = Addresses.filter(fila =>
        fila.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fila.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fila.country_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openAddressModal = () => {
        setAddressModalOpen(true);
    };

    useEffect(() => {
        fetchAddresss();
    }, []);

    const fetchAddresss = async () => {
        const { data, error } = await supabase.from<Address>('Client_Address').select('*');
        if (error) {
            console.error('Error fetching Addresses:', error);
        } else {
            setAddresss(data || []);
        }
    };

    const handleEditClick = (Address: Address) => {
        setSelectedAddress(Address);
        setIsEditModalOpen(true);
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedAddress(null);
        fetchAddresss();
    };

    const closeAddressModal = () => {
        setAddressModalOpen(false);
    };

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/clients">Clientes</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>{row.name}</BreadcrumbPage>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>Direcciones</BreadcrumbPage>
                    
                </BreadcrumbList>
            </Breadcrumb>
            <ClientInfo client={row} />
            <h1 className="text-2xl font-bold mb-4">Direcciones de entrega</h1>
            <button
                onClick={openAddressModal}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Agregar Dirección
            </button>
            <Modal isOpen={isAddressModalOpen} onClose={closeAddressModal}>
                <AddressForm onClose={closeAddressModal} onAddressAdded={fetchAddresss} client={row} />
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
            {isEditModalOpen && selectedAddress && (
                <EditAddressModal Address={selectedAddress} onClose={handleModalClose} />
            )}
            { }
        </div>


    );
};

export default Addresses;
