import Client from "@/interfaces/client";
import { getClientes } from "@/services/clientes.service";
import { useEffect, useState } from "react";


const useClientes = () => {
    const [clientes , setClientes] = useState<Client[]>([]);

    const fetchClientes = async () => {
        const { data} = await getClientes();
        setClientes(data || []);
    }

    useEffect(() => {
        fetchClientes();
    }, [])

    return { clientes, fetchClientes };

}


export default useClientes;