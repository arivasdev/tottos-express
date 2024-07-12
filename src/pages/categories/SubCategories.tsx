import React, { useEffect, useState } from 'react';
import {supabase} from '../../supabaseClient';
import SubCategoryForm from './SubCategoryForm';

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

const SubCategories: React.FC<Props> = ({ categoryId }) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [showActiveOnly, setShowActiveOnly] = useState(true);

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

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Subcategorías</h2>
      <SubCategoryForm categoryId={categoryId} setSubCategories={setSubCategories} />
      <div className="mb-4 mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Mostrar Solo Activas</label>
        <input
          type="checkbox"
          checked={showActiveOnly}
          onChange={() => setShowActiveOnly(!showActiveOnly)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      <div className="h-96 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4">
          {subCategories
            .filter((subCategory) => (showActiveOnly ? subCategory.isActive : true))
            .map((subCategory) => (
              <div key={subCategory.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-bold">{subCategory.name}</h3>
                <p>ID: {subCategory.id}</p>
                <p>Tarifa: ${subCategory.tarifa}</p>
                <p>Cobro por Peso: {subCategory.isCobroPorPeso ? 'Sí' : 'No'}</p>
                <p>Estado: {subCategory.isActive ? 'Activo' : 'Inactivo'}</p>
                <button
                  onClick={() => toggleSubCategoryStatus(subCategory.id)}
                  className={`mt-2 px-4 py-2 rounded ${
                    subCategory.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {subCategory.isActive ? 'Desactivar' : 'Activar'}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategories;
