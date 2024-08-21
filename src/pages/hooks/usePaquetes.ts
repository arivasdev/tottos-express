import { Paquete } from "@/interfaces/paquetes";
import { getPaquetes, getPaquete } from "@/services/paquetes.service";
import { useEffect, useState } from "react";

const usePaquetes = () => {
    const [paquetes, setPaquetes] = useState<Paquete[]>([]);
    const [paquete, setPaquete] = useState<Paquete | null>(null);

    const fetchPaquetes = async () => {
        const { data } = await getPaquetes();
        setPaquetes(data || []);
    }

    const fetchPaquete = async (id: any) => {
        const { data } = await getPaquete(id);
        if(data) setPaquete(data[0]);
    }

    useEffect(() => {
        fetchPaquetes();
    }, []);
    

    return { paquetes, fetchPaquetes, paquete, fetchPaquete };
}


export default usePaquetes;