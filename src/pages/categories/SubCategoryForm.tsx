import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

interface SubCategoryFormProps {
    categoryId: string;
    onClose: () => void;
    setSubCategories: React.Dispatch<React.SetStateAction<SubCategory[]>>;
}

const SubCategoryForm: React.FC<SubCategoryFormProps> = ({ categoryId, onClose, setSubCategories }) => {
    const [subCategoryName, setSubCategoryName] = useState('');
    const [tarifa, setTarifa] = useState<string>('0.00');
    const [isCobroPorPeso, setIsCobroPorPeso] = useState(true);

    const handleTarifaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Permitir solo números y un máximo de dos decimales
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setTarifa(value);
        }
    };

    const addSubCategory = async () => {
        const tarifaValue = parseFloat(tarifa);
        if (subCategoryName.trim() && tarifaValue >= 0) {
            const { error } = await supabase.from('SubCategories').insert({
                name: subCategoryName,
                categoryId,
                isCobroPorPeso,
                tarifa: tarifaValue,
                isActive: true,
            });

            if (error) {
                console.error('Error adding subcategory:', error);
            } else {
                setSubCategoryName('');
                setTarifa('0.00');
                setIsCobroPorPeso(true);
                const { data, error: fetchError } = await supabase.from<SubCategory>('SubCategories').select('*').eq('categoryId', categoryId);
                if (fetchError) {
                    console.error('Error fetching subcategories:', fetchError);
                } else {
                    setSubCategories(data || []);
                    onClose();
                }
            }
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Subcategoría</label>
            <input
                type="text"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">Tarifa (USD)</label>
            <input
                type="text"
                value={tarifa}
                onChange={handleTarifaChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <div className="flex items-center mb-4">
                <label className="block text-sm font-medium text-gray-700 mr-4">Cobro Por Peso</label>
                <input
                    type="checkbox"
                    id="toggleCobroPorPeso"
                    className="hidden"
                    checked={isCobroPorPeso}
                    onChange={(e) => setIsCobroPorPeso(e.target.checked)}
                />
                <label htmlFor="toggleCobroPorPeso" className="flex items-center cursor-pointer ml-2">
                    <div className={`block ${isCobroPorPeso ? 'bg-green-500' : 'bg-gray-600'} w-14 h-8 rounded-full relative`}>
                        <div
                            className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isCobroPorPeso ? 'transform translate-x-full bg-green-500' : ''
                                }`}
                        ></div>
                    </div>
                </label>
            </div>

            <button
                onClick={addSubCategory}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
                Agregar Subcategoría
            </button>
        </div>
    );
};

export default SubCategoryForm;
