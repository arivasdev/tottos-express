import { Viajero } from "@/interfaces/viajero";
import { getViajeros } from "@/services/viajeros.services";
import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
const useViajeros = () => {
    

    const [viajeros, setViajeros] = useState<Viajero[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    const fetchViajeros = async () => {
        setLoading(true);
        const { data, error } = await getViajeros();
        if (error) {
            setError(error);
        } else {
            setViajeros(data || []);
        }
        setLoading(false);
    }
    
    useEffect(() => {
        fetchViajeros();
    }, []);

    return { viajeros, loading, error, fetchViajeros };
}


export default useViajeros;
