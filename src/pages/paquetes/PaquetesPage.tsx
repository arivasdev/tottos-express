import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import PaquetesTable from './PaquetesTable';
import usePaquetes from '../hooks/usePaquetes';
import { Link } from 'react-router-dom';

const PaquetesPage: React.FC = () => {
    const { paquetes } = usePaquetes();

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/">
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/settings/maletas">
                                Paquetes
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl mt-3 font-bold mb-4">Paquetes</h1>
            <Link to="/packages/add" className="btn-success mb-6">Agregar Paquete</Link>



            <PaquetesTable data={paquetes}  />

        </>
    );
}

export default PaquetesPage;