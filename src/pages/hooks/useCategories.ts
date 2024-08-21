import Category from "@/interfaces/category";
import { getCategories } from "@/services/categories.service";
import { useEffect, useState } from "react";


const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const fetchCategories = async () => {
        const { data} = await getCategories();
        setCategories(data || []);
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return { categories, fetchCategories };

}


export default useCategories;