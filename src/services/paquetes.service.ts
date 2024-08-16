import { supabase } from "@/supabaseClient";
import { TABLES } from "@/interfaces/tables.enum";
import { Paquete } from "@/interfaces/paquetes";


interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getPaquetes = async (): Promise<SupabaseResponse<Paquete>> => {
    const response: SupabaseResponse<Paquete> = await supabase.from(TABLES.PAQUETES).select(`*, Countries:origin_country_id(name) as Origen, Countries:destination_country_id(name) as Destino, Clients:from_client(name) ClienteOrigen, Clients:to_client(name) ClienteDestino, Users:created_by(name) as Responsable`);
    
    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }
    
    return { data, error: null };
}

export const savePaquete = async (paquete: Paquete): Promise<SupabaseResponse<Paquete>> => {
    const { error } = await supabase.from(TABLES.PAQUETES).insert({ ...paquete });                                                                                                                                                
    if (error) {
        return { data: null, error };
    }
    
    return {  error: null };
}

export const updatePaquete = async (paquete: Paquete): Promise<SupabaseResponse<Paquete>> => {
    const { error } = await supabase.from(TABLES.PAQUETES).update({ ...paquete }).eq('id', paquete.id);
    if (error) {
        return { data: null, error };
    }
    
    return {  error: null };
}