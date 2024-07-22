import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useToast } from "@/components/ui/use-toast"
import DeliveryRoute from '@/interfaces/deliveryRoute';
import Country from '@/interfaces/country';
import { add } from 'date-fns';
import Address from '@/interfaces/address';


interface Props {
  addressRecord: Address;
  onClose: () => void;
}

const EditAddressModal: React.FC<Props> = ({ addressRecord, onClose }) => {
  const [countryId, setCountryId] = useState(addressRecord.country_id);
  const [routeId, setRouteId] = useState(addressRecord.route_id);
  const [address, setAddress] = useState(addressRecord.address);
  const [countries, setCountries] = useState<Country[]>([]);
  const [routes, setRoutes] = useState<DeliveryRoute[]>([]);
  const [defaultAddress, setDefaultAddress] = useState(addressRecord.defaultAddress);
  const { toast } = useToast()

  useEffect(() => {
    fetchCountries();
  }, [])
  const fetchCountries = async () => {
    const { data, error } = await supabase.from<Country>('Countries').select('*');
    if (error) {
      console.error('Error fetching Countries:', error);
    } else {
      setCountries(data || []);
    }
  };
  useEffect(() => {
    if (countryId) {
      const fetchRoutes = async () => {
        const { data, error } = await supabase
          .from<DeliveryRoute>('DeliveryRoutes')
          .select('*')
          .eq('countryId', countryId);

        if (error) {
          console.error('Error fetching routes:', error);
        } else {
          setRoutes(data || []);
        }
      };

      fetchRoutes();
    }
  }, [countryId]);

  const updateClient = async () => {
    const { error } = await supabase
      .from('Client_Address')
      .update({
        address,
        country_id: countryId,
        route_id: routeId,
      })
      .eq('id', addressRecord.id);

    if (error) {
      console.error('Error updating address:', error);
      toast({
        title: "Ocurrió un error actualizando la dirección",
        duration: 3000,
        className: "bg-red-200"
      })
    } else {

      toast({
        title: "Dirección Actualizada Correctamente",
        duration: 3000,
        className: "bg-green-200"
      })
      if (defaultAddress) {
        const { error, data } = await supabase.rpc('setDefaultAddress', {
          addressid: addressRecord.id,
          clientid: addressRecord.client_id,
        });
        console.log("🚀 ~ addAddress ~ data:", data)

        if (error) {
          console.error('Error setting default address:', error);
        } else {
          console.log('Default address updated successfully:', data);
        }
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Dirección</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">País</label>
          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option key="-1">
              Selecciona un País
            </option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Rutas</label>
          <select
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option key="-1">
              Selecciona una Ruta de Entrega
            </option>
            {routes.map((route) => (
              <option key={route.id} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center mb-4">
          <label className="block text-sm font-medium text-gray-700 mr-4">Dirección Predeterminada</label>
          <input
            type="checkbox"
            id="toggle"
            className="hidden"
            checked={defaultAddress}
            onChange={(e) => setDefaultAddress(e.target.checked)}
          />
          <label htmlFor="toggle" className="flex items-center cursor-pointer ml-2">
            <div className={`block ${defaultAddress ? 'bg-green-500' : 'bg-gray-600'} w-14 h-8 rounded-full relative`}>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${defaultAddress ? 'transform translate-x-full bg-green-500' : ''
                  }`}
              ></div>
            </div>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 outline mr-3 mt-2 outline-offset-1 outline-cyan-500 text-black rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-200"
          >
            Descartar Cambios
          </button>
          <button
            onClick={updateClient}
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Guardar
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;
