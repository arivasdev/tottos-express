import DeliveryRoute from "@/interfaces/deliveryRoute";
import { getDeliveryRoutes } from "@/services/deliveryRoute.service";
import { useState } from "react";

const useDeliveryRoutes = () => {
    const [deliveryRoutes, setDeliveryRoutes] = useState<DeliveryRoute[]>([]);
    const [loadingDeliveryRoutes, setLoadingDeliveryRoutes] = useState<boolean>(false);

    const fetchDeliveryRoutes = async (countryId : any) => {
        setLoadingDeliveryRoutes(true);
        const { data} = await getDeliveryRoutes(countryId);
        setDeliveryRoutes(data || []);
        setLoadingDeliveryRoutes(false);
    }

    return { deliveryRoutes, fetchDeliveryRoutes, loadingDeliveryRoutes };

}

export default useDeliveryRoutes;