import { supabase } from "@/supabaseClient";
import { Viajero } from "@/interfaces/viajero";
import { TABLES } from "@/interfaces/tables.enum";


interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getViajeros = async (): Promise<SupabaseResponse<Viajero>> => {
    const response: SupabaseResponse<Viajero> = await supabase.from(TABLES.VIAJEROS).select(`*, Users(name) as user_name`);
    
    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }
    
    return { data, error: null };
}

export const saveViajero = async (viajero: Viajero): Promise<SupabaseResponse<Viajero>> => {
    const { error } = await supabase.from(TABLES.VIAJEROS).insert({ ...viajero });                                                                                                                                                
    if (error) {
        return { data: null, error };
    }
    
    return {  error: null };
}

export const updateViajero = async (viajero: Viajero): Promise<SupabaseResponse<Viajero>> => {
    const { error } = await supabase.from(TABLES.VIAJEROS).update({ ...viajero }).eq('id', viajero.id);
    if (error) {
        return { data: null, error };
    }
    
    return {  error: null };
}