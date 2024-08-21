import { supabase } from "@/supabaseClient";
import { TABLES } from "@/interfaces/tables.enum";
import { SubCategory } from "@/interfaces/subcategory";

interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getSubCategories = async (categoryId: number): Promise<SupabaseResponse<SubCategory>> => {
    const response: SupabaseResponse<SubCategory> = await supabase.
        from(TABLES.SUBCATEGORIES).
        select('*').
        eq('isActive', true)
        .eq('categoryId', +categoryId)

    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }

    return { data, error: null };
}