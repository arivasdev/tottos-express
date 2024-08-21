import React, { useState } from 'react';
import { TiposPaquetes, MetodosEntrega } from "@/types/DBEnum.type";
import { ClientModal } from '@/components/ClientModal';
import { Switch } from '@/components/ui/switch';
import { CountrySelect } from '@/components/CountrySelect';
import { CategorySubcategorySelect } from '@/components/CategorySubcategorySelect';
import { Paquete } from '@/interfaces/paquetes';
import usePaquetesForm from './usePaquetesForm';
// import { Combobox } from '@/components/ui/combobox';
// import { Client } from '@/interfaces/client';
// import { supabase } from '@/supabaseClient';
interface PaquetesFormProps {
    afterSaveOrUpdate: () => void;
    selectedPaquete: Paquete | null;
}

const PackageForm: React.FC<PaquetesFormProps> = ({ afterSaveOrUpdate, selectedPaquete }) => {

    const { register, onSave, onUpdate } = usePaquetesForm();

    const operation = selectedPaquete ? onUpdate : onSave;

    if (selectedPaquete) {
        register('id', { value: selectedPaquete.id });
    }

    const [packageData, setPackageData] = useState({
        tipoItem: TiposPaquetes.COMPRA_EN_LINEA,
        item_recibido: false,
        origin_country_id: '',
        from_client: '',
        destination_country_id: '',
        to_client: '',
        metodoEntrega: MetodosEntrega.RETIRO_EN_SITIO,
        direccionEntrega: '',
        subCategory_id: '',
        producto: '',
        unidades: 0,
        peso: 0,
        totalFactura: 0,
        totalCobro: 0,
        pagadoPorAdelantado: false,
    });

    // const [clients, setClients] = useState<Client[]>([]);

    // useEffect(() => {
    //     fetchClients();
    // }, []);

    // const fetchClients = async () => {
    //     const { data, error } = await supabase.from<Client>('Clients').select('*').order('name', { ascending: true });
    //     if (error) {
    //         console.error('Error fetching clients:', error);
    //     } else {
    //         setClients(data || []);
    //     }
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPackageData({ ...packageData, [name]: value });
    };

    const handleSwitchChange = (name: string, value: boolean) => {
        setPackageData({ ...packageData, [name]: value });
    };

    // Add form submission logic here

    return (
        <form onSubmit={(values) => operation(afterSaveOrUpdate)(values)}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tipo de Servicio</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="tipoItem"
                    value={packageData.tipoItem} onChange={handleChange}>
                    {Object.values(TiposPaquetes).map((tipo) => (
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>

            </div>
            <div className="mb-4">
                <label htmlFor="item_recibido" className="block text-sm font-medium text-gray-700">Item Recibido (Deja sin seleccionar si no lo has recibido)</label>
                <Switch checked={packageData.item_recibido} onCheckedChange={(value) => handleSwitchChange('item_recibido', value)} />

            </div>
            <div className="mb-4">
                <label htmlFor="origin_country_id" className="block text-sm font-medium text-gray-700">Origen</label>
                <CountrySelect name="origin_country_id" value={packageData.origin_country_id} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="from_client" className="block text-sm font-medium text-gray-700">Cliente Origen</label>
                <ClientModal name="from_client" value={packageData.from_client} onChange={handleChange} />
                {/* <Combobox items={clients} sustantivo='Cliente Origen' onSelect={handleChange} /> */}
            </div>
            <div className="mb-4">
                <label htmlFor="destination_country_id" className="block text-sm font-medium text-gray-700">Destino</label>
                <CountrySelect name="destination_country_id" value={packageData.destination_country_id} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="to_client" className="block text-sm font-medium text-gray-700">Cliente Destino</label>
                <ClientModal name="to_client" value={packageData.to_client} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="metodoEntrega" className="block text-sm font-medium text-gray-700">Método de Entrega</label>
                <select name="metodoEntrega" value={packageData.metodoEntrega} onChange={handleChange}>
                    {Object.values(MetodosEntrega).map((metodo) => (
                        <option key={metodo} value={metodo}>
                            {metodo}
                        </option>
                    ))}
                </select>

            </div>
            <div className="mb-4">
                <label htmlFor="subCategory_id" className="block text-sm font-medium text-gray-700">Sub Categoría</label>
                <CategorySubcategorySelect name="subCategory_id" value={packageData.subCategory_id} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="producto" className="block text-sm font-medium text-gray-700">Producto</label>
                <input type="text" name="producto" value={packageData.producto} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="unidades" className="block text-sm font-medium text-gray-700">Unidades</label>
                <input type="number" name="unidades" value={packageData.unidades} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="peso" className="block text-sm font-medium text-gray-700">Peso</label>
                <input type="number" name="peso" value={packageData.peso} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="totalFactura" className="block text-sm font-medium text-gray-700">Total en Factura</label>
                <input type="number" step="0.01" name="totalFactura" value={packageData.totalFactura} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="totalCobro" className="block text-sm font-medium text-gray-700">Total a Cobrar</label>
                <input type="number" step="0.01" name="totalCobro" value={packageData.totalCobro} onChange={handleChange} />

            </div>
            <div className="mb-4">
                <label htmlFor="pagadoPorAdelantado" className="block text-sm font-medium text-gray-700">Pagado por Adelantado</label>
                <Switch checked={packageData.pagadoPorAdelantado} onCheckedChange={(value) => handleSwitchChange('pagadoPorAdelantado', value)} />
            </div>
            <button type="submit">Registrar Paquete</button>
        </form>
    );
};

export default PackageForm;
