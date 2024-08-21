import { supabase } from "@/supabaseClient";
import { TABLES } from "@/interfaces/tables.enum";
import DeliveryRoutes from "@/interfaces/deliveryRoute";

interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getDeliveryRoutes = async (countryId : number): Promise<SupabaseResponse<DeliveryRoutes>> => {
    const response: SupabaseResponse<DeliveryRoutes> = await supabase
    .from(TABLES.DELIVERY_ROUTES)
    .select('*')
    .eq('isActive', true)
    .eq('countryId', countryId);
    
    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }
    
    return { data, error: null };
}