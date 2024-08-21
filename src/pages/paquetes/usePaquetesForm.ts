import { Paquete } from "@/interfaces/paquetes";
import { useForm, Resolver } from 'react-hook-form';
import { useUserStore } from "@/store/user.store";
import { savePaquete, updatePaquete } from "@/services/paquetes.service";
import { validateRequiredFields } from '@/utils/validationUtils';

const requiredFields: (keyof Paquete)[] = ['tipoItem', 'origin_country_id','destination_country_id','from_client', 'to_client', 'metodoEntrega', 'direccionEntrega', 'subCategory_id', 'producto', 'unidades', 'peso', 'totalCobro'];

const usePaquetesForm = () => {
    const { user, setUser } = useUserStore();
    const resolver: Resolver<Paquete> = async (values: Paquete) => {
       return validateRequiredFields(values, requiredFields);
    }

    const { register, handleSubmit, formState: { errors }, watch, setValue, trigger} = useForm<Paquete>({ resolver });

    const onSave = (afterSaveOrUpdate: () => void) => handleSubmit(async (paquete: Paquete) => {
        try {
            if (!user) {
                setUser(null);
                console.error('No hay usuario logueado');
                return;
            }
            const created_by = user.id;

            const response = await savePaquete({ ...paquete, created_by });
            if (response.error) {
                console.error(response.error);
            }
            afterSaveOrUpdate();
        } catch (error) {
            console.error(error);
        }
    });

    const onUpdate = (afterSaveOrUpdate: () => void) => handleSubmit(async (paquete: Paquete) => {
        try {

            if (!user) {
                console.error('No hay usuario logueado');
                return;
            }

            const response = await updatePaquete(paquete);
            if (response.error) {
                console.error(response.error);
            }
            afterSaveOrUpdate();
        } catch (error) {
            console.error(error);
        }
    });

    return { register, onSave,onUpdate, errors, watch,setValue: setValue, trigger };
}


export default usePaquetesForm;