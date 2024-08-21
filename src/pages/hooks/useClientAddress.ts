import ClientAddress from "@/interfaces/address";
import { getClientAddress } from "@/services/address.service";
import { useState } from "react";

const useClientAddress = () => {
    const [clientAddress, setClientAddress] = useState<ClientAddress[]>([]);
    const [loadingClientAddress, setLoadingClientAddress] = useState<boolean>(false);

    const fetchClientAddress = async (address : Partial<ClientAddress>) => {
        if(!address.client_id || !address.country_id || !address.route_id) return;
        setLoadingClientAddress(true);
        const { data} = await getClientAddress(address);
        setClientAddress(data || []);
        setLoadingClientAddress(false);
    }

    return { clientAddress, fetchClientAddress, loadingClientAddress };
}

export default useClientAddress;