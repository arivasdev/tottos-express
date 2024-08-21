import { supabase } from "@/supabaseClient";
import { TABLES } from "@/interfaces/tables.enum";
import Category from "@/interfaces/category";

interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getCategories = async (): Promise<SupabaseResponse<Category>> => {
    const response: SupabaseResponse<Category> = await supabase.from(TABLES.CATEGORIES).select('*').eq('isActive', true);
    
    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }
    
    return { data, error: null };
}