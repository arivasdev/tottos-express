import React from 'react';
import useViajerosForm from './useViajerosForm';
import { Viajero } from '@/interfaces/viajero';


interface ViajerosFormProps {
    afterSaveOrUpdate: () => void;
    selectedViajero: Viajero | null;
}

const ViajerosForm: React.FC<ViajerosFormProps> = ({ afterSaveOrUpdate, selectedViajero }) => {

    const { register, onSave, onUpdate, errors } = useViajerosForm();

    const operation = selectedViajero ? onUpdate : onSave;

    if (selectedViajero) {
        register('id', { value: selectedViajero.id });
        register('name', { value: selectedViajero.name });
        register('alias', { value: selectedViajero.alias });
    }

    return (
        <form onSubmit={(values) => operation(afterSaveOrUpdate)(values)} autoComplete='off'>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    {...register('name')}
                />
                {errors.name && <p className="text-red-500 text-xs">Este campo es requerido</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="alias" className="block text-sm font-medium text-gray-700">Alias</label>
                <input
                    type="text"
                    id="alias"
                    {...register('alias')}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                />
                {errors.alias && <p className="text-red-500 text-xs">Este campo es requerido</p>}
            </div>

            <button
                type="submit"
                className="btn-success float-end"
            >
                Guardar
            </button>
        </form>
    );
}


export default ViajerosForm;