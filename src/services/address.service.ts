import { supabase } from "@/supabaseClient";
import { TABLES } from "@/interfaces/tables.enum";
import ClientAddress from "@/interfaces/address";

interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getClientAddress = async (address : Partial<ClientAddress>): Promise<SupabaseResponse<ClientAddress>> => {
    const response: SupabaseResponse<ClientAddress> = await supabase
    .from(TABLES.CLIENT_ADDRESS)
    .select('*')
    // .eq('isActive', true)
    .eq('client_id', address.client_id)
    .eq('country_id', address.country_id)
    .eq('route_id', address.route_id)
    
    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }
    
    return { data, error: null };
}