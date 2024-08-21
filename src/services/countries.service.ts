import { supabase } from "@/supabaseClient";
import { TABLES } from "@/interfaces/tables.enum";
import Country from "@/interfaces/country";

interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getCountries = async (): Promise<SupabaseResponse<Country>> => {
    const response: SupabaseResponse<Country> = await supabase.from(TABLES.COUNTRIES).select('*');
    
    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }
    
    return { data, error: null };
}