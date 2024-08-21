import { supabase } from "@/supabaseClient";
import { TABLES } from "@/interfaces/tables.enum";
import { Paquete } from "@/interfaces/paquetes";
import DeliveryRoute from "@/interfaces/deliveryRoute";


interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const getPaquetes = async (): Promise<SupabaseResponse<Paquete>> => {
    const response: SupabaseResponse<Paquete> = await supabase
        .from(TABLES.PAQUETES)
        .select(`*, 
            Origen:origin_country_id(name), 
            Destino:destination_country_id(name), 
            ClienteOrigen:from_client(name),
            ClienteDestino:to_client(name), 
            Responsable:created_by(name)`)
            .order('id', { ascending: false });

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

    return { error: null };
}

export const updatePaquete = async (paquete: Paquete): Promise<SupabaseResponse<Paquete>> => {
    const { error } = await supabase.from(TABLES.PAQUETES).update({ ...paquete }).eq('id', paquete.id);

    if (error) {
        return { data: null, error };
    }

    return { error: null };
}

export const getPaquete = async (id: bigint): Promise<SupabaseResponse<Paquete>> => {
    const response: SupabaseResponse<Paquete> = await supabase
        .from(TABLES.PAQUETES)
        .select(`*, 
            Origen:origin_country_id(name), 
            Destino:destination_country_id(name), 
            ClienteOrigen:from_client(name),
            ClienteDestino:to_client(name), 
            Responsable:created_by(name),
            DireccionEntregaItem:direccionEntrega(route_id,address)
            `)
        .eq('id', id);

        if(!response.error && response.data){
            const routeResponse : SupabaseResponse<DeliveryRoute> = await supabase
            .from(TABLES.DELIVERY_ROUTES)
            .select(`*`)
            .eq('id', response.data[0].DireccionEntregaItem?.route_id);
            if(!routeResponse.error && routeResponse.data){
                response.data[0].DeliveryRoute = {
                    id: parseInt(routeResponse.data[0].id),
                    name: routeResponse.data[0].name
                };
            }

        }

    const { data, error } = response;
    if (error) {
        return { data: null, error };
    }

    return { data, error: null };
}