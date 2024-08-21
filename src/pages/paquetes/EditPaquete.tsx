import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import PaquetesForm from './PaquetesForm';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import usePaquetes from '../hooks/usePaquetes';


const EditPaquete = () => {
    // get query params react router dom
    const { id } = useParams();
    const { paquete, fetchPaquete } = usePaquetes();
    let navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchPaquete(id);
        }
    }, []);

    const afterSaveOrUpdate = () => {
        navigate('/packages');
    }

    return <>
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/packages">
                            Paquetes
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/packages/edit">
                            Edit Paquete
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

            </BreadcrumbList>
        </Breadcrumb >
        <div className="pt-10">
            <PaquetesForm
                afterSaveOrUpdate={afterSaveOrUpdate}
                defaultValues={paquete}
            />
        </div>
    </>

}

export default EditPaquete;