import Country from "@/interfaces/country";
import { getCountries } from "@/services/countries.service";
import { useEffect, useState } from "react";


const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchCountries = async () => {
        setLoading(true);
        const { data} = await getCountries();
        setCountries(data || []);
        setLoading(false);
    }

    useEffect(() => {
        fetchCountries();
    }, [])

    return { countries, fetchCountries, loadingCountries: loading };

}


export default useCountries;