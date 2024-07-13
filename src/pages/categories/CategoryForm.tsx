import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

interface CategoryFormProps {
  onClose: () => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onClose, setCategories }) => {
  const [categoryName, setCategoryName] = useState('');

  const addCategory = async () => {
    if (categoryName.trim()) {
      const { data, error } = await supabase.from('Categories').insert([{ name: categoryName }]);
      if (error) {
        console.error('Error adding category:', error);
      } else {
        setCategoryName('');
        const { data: updatedCategories, error: fetchError } = await supabase.from<Category>('Categories').select('*');
        if (fetchError) {
          console.error('Error fetching categories:', fetchError);
        } else {
          setCategories(updatedCategories || []);
          onClose();
        }
      }
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Categoría</label>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={addCategory}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        Agregar Categoría
      </button>

    </div>
  );
};

export default CategoryForm;
