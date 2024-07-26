import { Viajero, ValidationError } from "@/interfaces/viajero";
import { useForm, Resolver } from 'react-hook-form';
import { saveViajero, updateViajero } from "@/services/viajeros.services";
import { useUserStore } from "@/store/user.store";

const requiredFields: (keyof Viajero)[] = ['name', 'alias'];

const useViajerosForm = () => {
    const { user } = useUserStore();
    const resolver: Resolver<Viajero> = async (values: Viajero) => {
        const errors: ValidationError = {};
        // validate all fields
        requiredFields.forEach((key: keyof Viajero) => {
            if (!values[key]) {
                errors[key] = { type: 'required', message: `El campo ${key} es requerido.` };
            }
        });

         return {
            values: Object.keys(errors).length === 0 ? values : {},
            errors: errors,
        };
    }

    const { register, handleSubmit, formState: { errors }, setError, setValue,watch } = useForm<Viajero>({ resolver });

    const onSave = (afterSaveOrUpdate: () => void) => handleSubmit(async ({name,alias}) => {
        try {

            if (!user) {
                console.error('No hay usuario logueado');
                return;
            }
            const created_at = new Date();
            const created_by = user.id;
            const isActive = true;

            const response = await saveViajero({ name, alias, created_by, created_at, isActive });
            if (response.error) {
                console.error(response.error);
            }
            afterSaveOrUpdate();
        } catch (error) {
            console.error(error);
        }
    });

    const onUpdate = (afterSaveOrUpdate: () => void) => handleSubmit(async ({id,name,alias}) => {
        try {

            if (!user) {
                console.error('No hay usuario logueado');
                return;
            }
            const created_at = new Date();
            const created_by = user.id;
            const isActive = true;

            const response = await updateViajero({id, name, alias, created_by, created_at, isActive });
            if (response.error) {
                console.error(response.error);
            }
            afterSaveOrUpdate();
        } catch (error) {
            console.error(error);
        }
    });






    return { register, onSave,onUpdate, errors };
}


export default useViajerosForm;
