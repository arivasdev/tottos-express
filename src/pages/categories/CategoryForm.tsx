import React, { useState } from 'react';
import {supabase} from '../../supabaseClient';

interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

interface Props {
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryForm: React.FC<Props> = ({ setCategories }) => {
  const [categoryName, setCategoryName] = useState('');

  const addCategory = async () => {
    if (categoryName.trim()) {
      const { error } = await supabase.from('Categories').insert({
        name: categoryName,
        isActive: true,
      });

      if (error) {
        console.error('Error adding category:', error);
      } else {
        setCategoryName('');
        const { data, error: fetchError } = await supabase.from<Category>('Categories').select('*');
        if (fetchError) {
          console.error('Error fetching categories:', fetchError);
        } else {
          setCategories(data || []);
        }
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Categoría</label>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        onClick={addCategory}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        Agregar Categoría
      </button>
    </div>
  );
};

export default CategoryForm;
