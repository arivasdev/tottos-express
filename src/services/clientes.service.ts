import { supabase } from "@/supabaseClient";
import { TABLES } from "@/interfaces/tables.enum";
import { Client } from "@/interfaces/client";

interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getClientes = async (): Promise<SupabaseResponse<Client>> => {
    const response: SupabaseResponse<Client> = await supabase.from(TABLES.CLIENTS).select('*');

    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }

    return { data, error: null };
}