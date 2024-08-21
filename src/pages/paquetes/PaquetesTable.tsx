import { DataTable } from '@/components/DataTable';
import { PaqueteColumns, Paquete } from '@/interfaces/paquetes';
import { Button } from '@/components/ui/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

type ViajerosTableProps<T> = {
    data: T[];
}


const PaquetesTable = ({ data }: ViajerosTableProps<Paquete>) => {



    const columns: PaqueteColumns = [
        {
            accessorKey: "producto",
            header: "Producto",
        },
        {
            accessorKey: "Origen",
            header: "Origen",
            cell: ({ row }) => <span>{row.original.Origen?.name}</span>
        },
        {
            accessorKey: "Destino",
            header: "Destino",
            cell: ({ row }) => <span>{row.original.Destino?.name}</span>
        },
        {
            accessorKey: "ClienteOrigen",
            header: "Cliente Origen",
            cell: ({ row }) => <span>{row.original.ClienteOrigen?.name}</span>
        },
        {
            accessorKey: "ClienteDestino",
            header: "Cliente Destino",
            cell: ({ row }) => <span>{row.original.ClienteDestino?.name}</span>
        },
        {
            accessorKey: "Responsable",
            header: "Responsable",
            cell: ({ row }) => <span>{row.original.Responsable?.name}</span>
        },
        {
            id : 'actions',
            header: 'Acciones',
            cell: ({ row }) => {
                let paquete = row.original;

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
                            <DropdownMenuItem asChild className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            onClick={() => {}}
                            >
                                <Link to={`/packages/edit/${paquete.id}`}>Editar</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },

    ]


    return <DataTable columns={columns} data={data} />
}

export default PaquetesTable;