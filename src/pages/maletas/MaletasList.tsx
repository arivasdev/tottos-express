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
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='rounded-md border bg-white shadow-md' align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem className='hover:bg-gray-200'
                                onClick={() => handleEditClick(maleta)}
                            >
                                Editar
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <Link to={`/addresses/${row.id}`} state={{ maleta: maleta }}>
                                <DropdownMenuItem className='hover:bg-gray-200'>
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
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
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
