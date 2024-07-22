import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import CategoryForm from './CategoryForm';
import SubCategories from './SubCategories';
import Modal from '@/components/Modal';

interface Category {
  id: string;
  name: string;
  isActive: boolean;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  const openCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setCategoryModalOpen(false);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from<Category>('Categories').select('*');
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data || []);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategoryStatus = async (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      const { error } = await supabase
        .from('Categories')
        .update({ isActive: !category.isActive })
        .eq('id', categoryId);

      if (error) {
        console.error('Error updating category status:', error);
      } else {
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
    <div className="flex p-1 ">
      <div className="w-1/2 pr-4">
        <h1 className="text-2xl font-bold mb-4">Categorías</h1>
        <button
          onClick={openCategoryModal}
          className="btn-success"
        >
          Agregar Categoría
        </button>

        <Modal isOpen={isCategoryModalOpen} onClose={closeCategoryModal}>
          <CategoryForm onClose={closeCategoryModal} setCategories={setCategories} />
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
            {categories
              .filter((category) => (showActiveOnly ? category.isActive : true))
              .map((category) => (
                <div key={category.id} className={`${selectedCategory == category.id ? 'border-2 border-blue-500' : ''}  bg-white flex justify-between shadow-md rounded-lg p-4 mr-3`}>
                  <div className='flex flex-col justify-evenly'>
                    <h3 className="text-xl font-bold">{category.name}</h3>
                    <div className='flex'>

                      <p className={`status w-full ${category.isActive ? ' bg-green-500' : ' bg-red-500'}`}>{category.isActive ? 'Activo' : 'Inactivo'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col-reverse items-end">
                    <button
                      onClick={() => toggleCategoryStatus(category.id)}
                      className={`text-center mt-2 w-full ${category.isActive ? 'btn-danger' : 'btn-success'
                        } text-white`}
                    >
                      {category.isActive ? 'Desactivar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className="btn-info w-full"
                    >
                      Ver Subcategorías
                    </button>
                  </div>

                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="w-1/2 pl-2  shadow-lg">
        {selectedCategory ? (
          <SubCategories categoryId={selectedCategory} />
        ) : (
          <p className="text-lg">Seleccione una categoría para ver sus subcategorías</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
