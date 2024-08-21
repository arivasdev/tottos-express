import React, { useEffect } from 'react';
import useCountries from '../hooks/useCountries';
import useClientes from '../hooks/useClientes';
import useCategories from '../hooks/useCategories';
import useSubCategories from '../hooks/useSubCategories';
import usePaquetesForm from './usePaquetesForm';

import { MetodosEntrega, TiposPaquetes } from '@/types/DBEnum.type';
import { Combobox } from '@/components/ui/combobox';
import { Paquete } from '@/interfaces/paquetes';
import useDeliveryRoutes from '../hooks/useDeliveryRoute';
import useClientAddress from '../hooks/useClientAddress';
import { Link } from 'react-router-dom';

interface PaquetesFormProps {
    afterSaveOrUpdate: () => void;
    defaultValues?: Paquete | null;
}

const PaquetesForm: React.FC<PaquetesFormProps> = ({ afterSaveOrUpdate, defaultValues }) => {
    const { countries, loadingCountries } = useCountries();
    const { clientes } = useClientes();
    const { categories } = useCategories();
    const { deliveryRoutes, fetchDeliveryRoutes, loadingDeliveryRoutes } = useDeliveryRoutes();
    const { subCategories, fetchSubCategories, loadingSubCategories } = useSubCategories();
    const { clientAddress, fetchClientAddress, loadingClientAddress } = useClientAddress();
    const [deliveryRouteSelected, setDeliveryRouteSelected] = React.useState<string>('');
    

    const { register, onSave, errors, setValue, watch, trigger,onUpdate } = usePaquetesForm();


    useEffect(() => {
        const fields = ['origin_country_id', 'from_client', 'destination_country_id', 'to_client', 'metodoEntrega', 'direccionEntrega', 'unidades', 'peso', 'totalFactura', 'totalCobro', 'pagadoPorAdelantado', 'tipoItem', 'item_recibido', 'producto', 'subCategory_id'] as Array<keyof Paquete>;
        if (defaultValues) {

            fields.forEach((field) => {
                setValue(field, defaultValues[field]);
            });

            // ruta de entrega
            fetchDeliveryRoutes(defaultValues.destination_country_id);
            setDeliveryRouteSelected(defaultValues.DeliveryRoute?.id || '');
            setValue('id', defaultValues.id);
        }

    }, [defaultValues,watch]);

    useEffect(() => {
        if (defaultValues) {
            fetchClientAddress({
                country_id: String(defaultValues.destination_country_id), // Convertir a string
                client_id: String(defaultValues.to_client), // Convertir a string
                route_id: deliveryRouteSelected
            });
        }
    }, [defaultValues, watch]);

    const operation = defaultValues ? onUpdate : onSave;

    const onCategoryChange = (category: any) => {
        fetchSubCategories(category.id);
        onInputChange('subCategory_id', '' as any);
    }

    const onInputChange = (field: keyof Paquete, value: number) => {
        setValue(field, value);
        trigger()
    };

    return (
        <form
            className="p-10 bg-white shadow-lg rounded-lg overflow-hidden"
            onSubmit={(values) => operation(afterSaveOrUpdate)(values)}
            onChange={() => trigger()}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* TIPO ITEM */}
                <div>
                    <label htmlFor="tipoItem" className="block text-sm font-medium text-gray-700">Tipo de Item</label>
                    <select
                        className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        {...register('tipoItem')}
                    >
                        {Object.values(TiposPaquetes).map((tipo) => (
                            <option key={tipo} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>
                </div>

                {/* RECIBIDO */}
                <div className="col-span-1 md:col-span-2 lg:col-span-2">
                    <label htmlFor="item_recibido" className="block text-sm font-medium text-gray-700">Item Recibido</label>
                    <div className="mt-2 relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in">
                        <input
                            type="checkbox"
                            id="item_recibido"
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-blue-500"
                            {...register('item_recibido')}
                        />
                        <label
                            htmlFor="item_recibido"
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        />
                    </div>
                </div>

                {/* PAIS ORIGEN */}
                <div className='flex flex-col w-100'>
                    <label className="block text-sm font-medium text-gray-700">País Origen</label>
                    {
                        loadingCountries ? (
                            <div>Cargando...</div>
                        ) : (
                            <Combobox
                                items={countries.map(({ name, id }) => ({ label: name, value: name, id }))}
                                sustantivo='país origen' onSelect={({ id }) => onInputChange('origin_country_id', id)}
                                defaultValue={defaultValues?.Origen?.name}
                            />
                        )
                    }

                    {errors.origin_country_id && <p className="text-red-500 text-xs">Este campo es requerido</p>}

                </div>

                {/* CLIENTE ORIGEN */}
                <div className='flex flex-col w-100'>
                    <label className="block text-sm font-medium text-gray-700">Cliente Origen</label>
                    <Combobox
                        items={clientes.map(({ name, id }) => ({ label: name, value: name, id }))}
                        sustantivo='cliente origen'
                        onSelect={({ id }) => {
                            onInputChange('from_client', id)
                            fetchClientAddress({
                                country_id: String(watch('origin_country_id')), // Convertir a string
                                client_id: String(id), // Convertir a string
                                route_id: deliveryRouteSelected
                            });
                        }}
                        defaultValue={defaultValues?.ClienteOrigen?.name}
                    />
                    {errors.from_client && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* PAIS DESTINO */}
                <div className='flex flex-col w-100'>
                    <label className="block text-sm font-medium text-gray-700">País Destino</label>
                    <Combobox
                        items={countries.map(({ name, id }) => ({ label: name, value: name, id }))}
                        sustantivo='cliente destino'
                        onSelect={({ id }) => {
                            onInputChange('destination_country_id', id);
                            fetchDeliveryRoutes(id)
                            fetchClientAddress({
                                country_id: id,
                                client_id: String(watch('to_client')),
                                route_id: deliveryRouteSelected
                            });
                        }}
                        defaultValue={defaultValues?.Destino?.name}
                    />
                    {errors.destination_country_id && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* CLIENTE DESTINO */}
                <div className='flex flex-col w-100'>
                    <label className="block text-sm font-medium text-gray-700">Cliente Destino</label>
                    <Combobox
                        items={clientes.map(({ name, id }) => ({ label: name, value: name, id }))}
                        sustantivo='cliente destino' onSelect={({ id }) => {
                            onInputChange('to_client', id)
                            fetchClientAddress({
                                country_id: String(watch('destination_country_id')), // Convertir a string
                                client_id: String(id), // Convertir a string
                                route_id: deliveryRouteSelected
                            });
                        }}
                        defaultValue={defaultValues?.ClienteDestino?.name}
                    />
                    {errors.to_client && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* METODO DE ENTREGA */}
                <div>
                    <label htmlFor="metodoEntrega" className="block text-sm font-medium text-gray-700">Método de Entrega</label>
                    <select
                        className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        {...register('metodoEntrega')}
                    >
                        {Object.values(MetodosEntrega).map((metodo) => (
                            <option key={metodo} value={metodo}>
                                {metodo}
                            </option>
                        ))}
                    </select>
                    {errors.metodoEntrega && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* RUTA DE ENTREGA */}
                <div className='flex flex-col w-100'>
                    <label className="block text-sm font-medium text-gray-700">Ruta de Entrega</label>
                    {
                        loadingDeliveryRoutes ? (
                            <div>Cargando...</div>
                        ) : (
                            <Combobox
                                items={deliveryRoutes.map(({ name, id }) => ({ label: name, value: name, id }))}
                                sustantivo='ruta de entrega'
                                onSelect={({ id }) => {
                                    setDeliveryRouteSelected(id);
                                    fetchClientAddress({
                                        country_id: String(watch('destination_country_id')), // Convertir a string
                                        client_id: String(watch('to_client')), // Convertir a string
                                        route_id: String(id) // Convertir a string
                                    });
                                }}
                                defaultValue={defaultValues?.DeliveryRoute?.name}
                            />
                        )
                    }
                </div>

                {/* CATEGORIA */}
                <div className='flex flex-col w-100'>
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <Combobox
                        items={categories.map(({ name, id }) => ({ label: name, value: name, id }))}
                        sustantivo='categoría' onSelect={(category) => onCategoryChange(category)}
                    />
                </div>

                {/* SUB CATEGORIA */}
                <div className='flex flex-col w-100'>
                    <label className="block text-sm font-medium text-gray-700">Sub Categoría</label>
                    {loadingSubCategories ? (
                        <div>Cargando...</div>
                    ) : (
                        <Combobox
                            items={subCategories.map(({ name, id }) => ({ label: name, value: name, id }))}
                            sustantivo='subcategoría' onSelect={({ id }) => onInputChange('subCategory_id', id)}
                        />
                    )}
                    {errors.subCategory_id && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>



                {/* PRODUCTO */}
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <label htmlFor="producto" className="block text-sm font-medium text-gray-700">Producto</label>
                    <textarea
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        {...register('producto')}
                    />
                    {errors.producto && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* DIRECCION ENTREGA */}
                <div className="col-span-1 flex flex-col w-100">
                    <label htmlFor="direccionEntrega" className="block text-sm font-medium text-gray-700">Dirección de Entrega</label>
                    {
                        loadingClientAddress ? (
                            <div>Cargando...</div>
                        ) : (
                            <Combobox
                                items={clientAddress.map(({ address, id }) => ({ label: address, value: address, id }))}
                                sustantivo='dirección de entrega' onSelect={({ id }) => onInputChange('direccionEntrega', id)}
                                defaultValue={defaultValues?.DireccionEntregaItem?.address}
                            />
                        )
                    }
                    {errors.direccionEntrega && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* UNIDADES */}
                <div>
                    <label htmlFor="unidades" className="block text-sm font-medium text-gray-700">Unidades</label>
                    <input
                        type="number"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        {...register('unidades')}
                    />
                    {errors.unidades && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* PESO */}
                <div>
                    <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('peso')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" />
                    {errors.peso && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* TOTAL FACTURA */}
                <div>
                    <label htmlFor="totalFactura" className="block text-sm font-medium text-gray-700">Total en Factura</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('totalFactura')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    {errors.totalFactura && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* TOTAL COBRO */}
                <div>
                    <label htmlFor="totalCobro" className="block text-sm font-medium text-gray-700">Total a Cobrar</label>
                    <input
                        type="number"
                        step="0.01"
                        {...register('totalCobro')}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    />
                    {errors.totalCobro && <p className="text-red-500 text-xs">Este campo es requerido</p>}
                </div>

                {/* PAGO POR ADELANTADO */}
                <div>
                    <label htmlFor="pago_adelantado" className="block text-sm font-medium text-gray-700">Pago por Adelantado</label>
                    <div className="mt-2 relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in">
                        <input
                            type="checkbox"
                            id="pago_adelantado"
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-blue-500"
                            {...register('pagadoPorAdelantado')}
                        />
                        <label
                            htmlFor="pago_adelantado"
                            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {/* BOTÓN DE GUARDAR */}
            <div className="mt-6 flex justify-end">
                <Link type="button" className="btn-dark" to={'/packages'}>Cancelar</Link>
                <button type="submit" className="px-6 py-2 btn-success text-white rounded-md">Guardar
                </button>
            </div>
        </form>
    );
};

export default PaquetesForm;