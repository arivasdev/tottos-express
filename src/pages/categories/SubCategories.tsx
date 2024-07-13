import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import SubCategoryForm from './SubCategoryForm';
import Modal from '@/components/Modal';

interface SubCategory {
    id: string;
    name: string;
    categoryId: string;
    isCobroPorPeso: boolean;
    tarifa: number;
    isActive: boolean;
}

interface Props {
    categoryId: string;
}

interface Category {
    id: string;
    name: string;
    isActive: boolean;
}

const SubCategories: React.FC<Props> = ({ categoryId }) => {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [category, setCategory] = useState<Category>();
    const [showActiveOnly, setShowActiveOnly] = useState(true);
    const [isSubCategoryModalOpen, setSubCategoryModalOpen] = useState(false);
    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory|null>(null);

    useEffect(() => {
        const fetchSubCategories = async () => {
            const { data, error } = await supabase
                .from<SubCategory>('SubCategories')
                .select('*')
                .eq('categoryId', categoryId);
            if (error) {
                console.error('Error fetching subcategories:', error);
            } else {
                setSubCategories(data || []);
            }
        };

        fetchSubCategories();

        const fetchCategory = async () => {
            const { data, error } = await supabase.from<Category>('Categories').select('*').eq("id", categoryId);
            if (error) {
                console.error('Error fetching single category:', error);
            } else {
                if (data.length > 0)
                    setCategory(data[0]);
            }
        };

        fetchCategory();
    }, [categoryId]);

    const toggleSubCategoryStatus = async (subCategoryId: string) => {
        const subCategory = subCategories.find((sc) => sc.id === subCategoryId);
        if (subCategory) {
            const { error } = await supabase
                .from('SubCategories')
                .update({ isActive: !subCategory.isActive })
                .eq('id', subCategoryId);

            if (error) {
                console.error('Error updating subcategory status:', error);
            } else {
                const { data, error: fetchError } = await supabase
                    .from<SubCategory>('SubCategories')
                    .select('*')
                    .eq('categoryId', categoryId);
                if (fetchError) {
                    console.error('Error fetching subcategories:', fetchError);
                } else {
                    setSubCategories(data || []);
                }
            }
        }
    };



    const agregar = () => {
        setSelectedSubCategory(null);
        openSubCategoryModal();
    };

    const editar = (subCat: SubCategory) => {
        setSelectedSubCategory(subCat);
        openSubCategoryModal();
    };

    const openSubCategoryModal = () => {
        setSubCategoryModalOpen(true);
    };

    const closeSubCategoryModal = () => {
        setSubCategoryModalOpen(false);
    }
    return (
        <div className="">
            <h2 className="text-xl font-bold mb-4">Subcategorías de: {category?.name}</h2>
            <button
                onClick={agregar}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
                Agregar Subcategoría
            </button>
            <Modal isOpen={isSubCategoryModalOpen} onClose={closeSubCategoryModal}>

                <SubCategoryForm subCategory={selectedSubCategory} onClose={closeSubCategoryModal} categoryId={categoryId} setSubCategories={setSubCategories} />
            </Modal>
            <div className="mb-4 mt-6 flex justify-start">
                <input
                    type="checkbox"
                    checked={showActiveOnly}
                    onChange={() => setShowActiveOnly(!showActiveOnly)}
                    className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="block text-sm font-medium text-gray-700 mb-2">Mostrar Solo Activas</label>
            </div>
            <div className="h-96 overflow-y-auto">
                <div className="grid grid-cols-1 gap-4">
                    {subCategories
                        .filter((subCategory) => (showActiveOnly ? subCategory.isActive : true))
                        .map((subCategory) => (
                            <div key={subCategory.id} className="bg-white flex justify-between shadow-md rounded-lg p-4">
                                <div className='flex flex-col justify-evenly'>
                                    <h3 className="text-lg font-bold">{subCategory.name}</h3>
                                    <p>Tarifa: ${subCategory.tarifa}</p>
                                    <p>Cobro por Peso: {subCategory.isCobroPorPeso ? 'Sí' : 'No'}</p>
                                    <div className='flex'>

                                        <p className={`status w-full ${subCategory.isActive ? ' bg-green-500' : ' bg-red-500'}`}>{subCategory.isActive ? 'Activo' : 'Inactivo'}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end justify-center">
                                    <button
                                        onClick={() => editar(subCategory)}
                                        className={`mt-2 px-4 py-2 rounded outline outline-offset-2 outline-cyan-500 text-black`}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => toggleSubCategoryStatus(subCategory.id)}
                                        className={`mt-2 px-4 py-2 rounded ${subCategory.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                            } text-white`}
                                    >
                                        {subCategory.isActive ? 'Desactivar' : 'Activar'}
                                    </button>
                                </div>

                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default SubCategories;
