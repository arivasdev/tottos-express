import Category from '@/interfaces/category';
import { SubCategory } from '@/interfaces/subcategory';
import { supabase } from '@/supabaseClient';
import React, { useState, useEffect } from 'react';

interface CategorySubcategorySelectProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const CategorySubcategorySelect: React.FC<CategorySubcategorySelectProps> = ({ name, value, onChange }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Aquí se cargarían las categorías desde la base de datos
        const fetchCategories = async () => {
            const { data, error } : SupabaseResponse<Category> = await supabase.from('Categories').select('*');
            if (error) {
                console.error('Error fetching categories:', error);
            } else {
                setCategories(data || []);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);

        ///NO CREO QUE ESTA LINEA DEBA ESTAR AQUI
        setSubcategories([]); // Limpiar subcategorías cuando se cambia la categoría
    };

    useEffect(() => {
        if (selectedCategory) {
            // Aquí se cargarían las subcategorías según la categoría seleccionada
            const fetchSubCategories = async () => {
                const { data, error } : SupabaseResponse<SubCategory> = await supabase
                    .from('SubCategories')
                    .select('*')
                    .eq('categoryId', selectedCategory);
                if (error) {
                    console.error('Error fetching subcategories:', error);
                } else {
                    setSubcategories(data || []);
                }
            };

            fetchSubCategories();
        }
    }, [selectedCategory]);

    return (
        <>
            <label>Categoría</label>
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label>Subcategoría</label>
            <select name={name} value={value} onChange={onChange}>
                <option value="">Seleccionar subcategoría</option>
                {subcategories
                    .filter((subcategory) => subcategory.categoryId === Number(selectedCategory))
                    .map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                        </option>
                    ))}
            </select>
        </>
    );
};