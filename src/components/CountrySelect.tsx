import Country from '@/interfaces/country';
import { supabase } from '@/supabaseClient';
import React, { useEffect, useState } from 'react';

interface CountrySelectProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface SupabaseResponse<T> {
    data?: T[] | null;
    error: any | null;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ name, value, onChange }) => {

    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetchCountries();
    }, [])

    const fetchCountries = async () => {
        const { data, error } : SupabaseResponse<Country> = await supabase.from('Countries').select('*');
        if (error) {
            console.error('Error fetching Countries:', error);
        } else {
            setCountries(data || []);
        }
    };

    return (
        <select name={name} value={value} onChange={onChange}>
            {countries.map((country) => (
                <option key={country.id} value={country.id}>
                    {country.name}
                </option>
            ))}
        </select>
    );
};
