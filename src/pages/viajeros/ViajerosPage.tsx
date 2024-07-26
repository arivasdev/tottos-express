import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import ViajerosTable from './ViajerosTable';
import useViajeros from './useViajeros';
import Modal from '@/components/Modal';
import { Viajero } from '@/interfaces/viajero';
import ViajerosForm from './ViajerosForm';



const ViajerosPage: React.FC = () => {
    const { viajeros, fetchViajeros } = useViajeros();
    const [showModal, setShowModal] = React.useState(false);
    const [selectedViajero, setSelectedViajero] = React.useState<Viajero | null>(null);

    const action = selectedViajero ? 'Editar' : 'Crear nuevo';

    const handleEditClick = (viajero: Viajero | null) => {
        setSelectedViajero(viajero);
        setShowModal(true);
    }

    const afterSaveOrUpdate = () => {
        setShowModal(false);
        fetchViajeros();
        setSelectedViajero(null);
    }

    const onClose = () => {
        setShowModal(false);
        setSelectedViajero(null);
    };

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/settings/maletas">Viajeros</BreadcrumbLink>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl mt-3 font-bold mb-4">Viajeros</h1>

            <button
                onClick={() => setShowModal(true)}
                className="btn-success mb-6"
            >
                Agregar Viajero
            </button>

            <ViajerosTable data={viajeros} handleEditClick={handleEditClick} />

            <Modal isOpen={showModal} onClose={onClose}>
                <h1 className="text-2xl font-bold mb-4">{action} viajero</h1>

                <ViajerosForm afterSaveOrUpdate={afterSaveOrUpdate} selectedViajero={selectedViajero} />
            </Modal>
        </>
    );
}

export default ViajerosPage;