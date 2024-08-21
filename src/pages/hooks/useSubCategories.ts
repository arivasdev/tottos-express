import { SubCategory } from "@/interfaces/subcategory";

import { getSubCategories } from "@/services/subcategories.service";
import { useState } from "react";


const useSubCategories = () => {
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSubCategories = async (categoryId : number) => {
        setLoading(true);
        const { data } = await getSubCategories(categoryId);
        setSubCategories(data || []);
        setLoading(false);
    }

    return { subCategories, fetchSubCategories,loadingSubCategories: loading };
}


export default useSubCategories;