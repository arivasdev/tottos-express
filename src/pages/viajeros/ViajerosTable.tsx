import { DataTable } from '@/components/DataTable';
import { ViajeroColumns, Viajero } from '@/interfaces/viajero';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/dateUtil';
import { MoreHorizontal } from 'lucide-react';

type ViajerosTableProps = {
    data: Viajero[];
    handleEditClick: (viajero: Viajero | null) => void;
}

const ViajerosTable = ({ data, handleEditClick }: ViajerosTableProps) => {
    const columns: ViajeroColumns = [
        {
            accessorKey: "name",
            header: "Nombre",
        },
        {
            accessorKey: "alias",
            header: "Alias",
        },
        {
            accessorKey: "created_at",
            header: "Creado el",
            cell: ({ row }) => {
                return formatDate(new Date(row.original.created_at));
            }
        },
        {
            accessorKey: "created_by",
            header: "Creado por",
            cell: ({ row }) => {
                return row.original?.Users?.name;
            }
        },
        {
            accessorKey: "isActive",
            header: "Activo",
            cell: ({ row }) => {
                let isActive = row.original.isActive;

                return isActive ? <Badge variant="secondary">Activo</Badge> : <Badge variant="destructive">Inactivo</Badge>
            }
        },
        {
            id: "actions",
            cell: ({ row }) => {
                let viajero = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 focus:outline-none">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='rounded-md bg-white shadow-lg z-10 absolute right-0' align="start">
                            <DropdownMenuLabel className='px-4 py-2 text-gray-500 text-sm'>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            onClick={() => handleEditClick(viajero)}
                            >
                                Editar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return <DataTable columns={columns} data={data} />
}

export default ViajerosTable;