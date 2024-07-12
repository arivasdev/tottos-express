import React, { useState } from 'react';
import {supabase} from '../../supabaseClient';

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
  setSubCategories: React.Dispatch<React.SetStateAction<SubCategory[]>>;
}

const SubCategoryForm: React.FC<Props> = ({ categoryId, setSubCategories }) => {
  const [subCategoryName, setSubCategoryName] = useState('');
  const [tarifa, setTarifa] = useState<number>(0);
  const [isCobroPorPeso, setIsCobroPorPeso] = useState(true);

  const addSubCategory = async () => {
    if (subCategoryName.trim() && tarifa >= 0) {
      const { error } = await supabase.from('SubCategories').insert({
        name: subCategoryName,
        categoryId,
        isCobroPorPeso,
        tarifa,
        isActive: true,
      });

      if (error) {
        console.error('Error adding subcategory:', error);
      } else {
        setSubCategoryName('');
        setTarifa(0);
        setIsCobroPorPeso(true);
        const { data, error: fetchError } = await supabase.from<SubCategory>('SubCategories').select('*').eq('categoryId', categoryId);
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Subcategoría</label>
        <input
          type="text"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tarifa (USD)</label>
        <input
          type="number"
          min="0"
          value={tarifa}
          onChange={(e) => setTarifa(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Cobro Por Peso</label>
        <input
          type="checkbox"
          checked={isCobroPorPeso}
          onChange={(e) => setIsCobroPorPeso(e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>

      <button
        onClick={addSubCategory}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        Agregar Subcategoría
      </button>
    </div>
  );
};

export default SubCategoryForm;
