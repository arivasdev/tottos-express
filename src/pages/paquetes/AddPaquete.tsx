import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import PaquetesForm from './PaquetesForm';
import { Link } from "react-router-dom";
import { useNavigate }  from "react-router-dom";


const AddPaquete = () => {
    let navigate = useNavigate();

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
                        <Link to="/packages/add">
                            Agregar Paquete
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

            </BreadcrumbList>
        </Breadcrumb >
        <div className="pt-10">
            <PaquetesForm afterSaveOrUpdate={afterSaveOrUpdate} />
        </div>
    </>

}

export default AddPaquete;