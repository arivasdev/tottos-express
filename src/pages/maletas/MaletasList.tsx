import { DataTable } from '@/components/DataTable';
import Modal from '@/components/Modal';
import Maleta from '@/interfaces/maleta';
import { supabase } from '@/supabaseClient';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';
import MaletaForm from './MaletaForm';
import EditMaletaModal from './EditMaletaModal';
import { Button } from '@/components/ui/Button';
import { ArrowUpDown, Badge, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';

const MaletasList: React.FC = () => {

    const columns: ColumnDef<Maleta>[] = [
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
            accessorKey: "descripcion",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Descripcion
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "pesoTara",
            header: "Peso Tara (lb)",
        },
        {
            accessorKey: "pesoMax",
            header: "Capacidad máxima (lb)",
        },
        {
            accessorKey: "anchoCM",
            header: "Ancho (cm)",
        },
        {
            accessorKey: "altoCM",
            header: "Alto (cm)",
        },
        {
            accessorKey: "largoCM",
            header: "Largo (cm)",
        },
        
        {
            id: "actions",
            cell: ({ row }) => {
                let maleta = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 focus:outline-none">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className='rounded-md bg-white shadow-lg z-10 absolute right-0'>
                            <DropdownMenuLabel className='px-4 py-2 text-gray-500 text-sm'>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            onClick={() => handleEditClick(maleta)}
                            >
                                Editar
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className='border-t border-gray-200' />
                            <Link to={`/addresses/${row.id}`} state={{ maleta: maleta }}>
                                <DropdownMenuItem className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'>
                                    Ver Direcciones
                                </DropdownMenuItem>
                            </Link>

                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const [maletas, setMaletas] = useState<Maleta[]>([]);
    const [selectedMaleta, setSelectedMaleta] = useState<Maleta | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isMaletaModalOpen, setMaletaModalOpen] = useState(false);


    const openMaletaModal = () => {
        setMaletaModalOpen(true);
    };

    useEffect(() => {
        fetchMaletas();
    }, []);

    const fetchMaletas = async () => {
        const { data, error } = await supabase.from<Maleta>('Maletas').select('*').order('name', { ascending: true });
        if (error) {
            console.error('Error fetching maletas:', error);
        } else {
            setMaletas(data || []);
        }
    };

    const handleEditClick = (maleta: Maleta) => {
        setSelectedMaleta(maleta);
        setIsEditModalOpen(true);
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedMaleta(null);
        fetchMaletas();
    };

    const closeMaletaModal = () => {
        setMaletaModalOpen(false);
    };
    return (
        <div>
            <button
                onClick={openMaletaModal}
                className="btn-success mb-6"
            >
                Agregar Maleta
            </button>
            <Modal isOpen={isMaletaModalOpen} onClose={closeMaletaModal}>
                <MaletaForm onClose={closeMaletaModal} onMaletaAdded={fetchMaletas} />
            </Modal>

            <div className="mx-auto py-10">
                
                <DataTable columns={columns} data={maletas} />
            </div>
            {isEditModalOpen && selectedMaleta && (
                <EditMaletaModal maletaRecord={selectedMaleta} onClose={handleModalClose} />
            )}
            { }
        </div>


    );
};

export default MaletasList;
