import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react';
import ClientInfo from '../clients/ClientInfo';
import { useLocation } from 'react-router-dom';
import { Client } from '@/interfaces/client';
import Addresses from './Addresses';
const AddressPage: React.FC = () => {

    const location = useLocation();
    const { client } = location.state  as { client: Client };

    return (
        <>
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
                    <BreadcrumbPage>{client.name}</BreadcrumbPage>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>Direcciones de Entrega</BreadcrumbPage>

                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-bold mb-4">Direcciones de entrega</h1>
            <ClientInfo client={client} />
            <Addresses client={client} />
        </>
    );
}

export default AddressPage;
