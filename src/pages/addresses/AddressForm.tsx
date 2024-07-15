import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import Client from '@/interfaces/client';
import Country from '@/interfaces/country';
import DeliveryRoute from '@/interfaces/deliveryRoute';

interface Props {
  onAddressAdded: () => void;
  onClose: () => void;
  client: Client;
}

const AddressForm: React.FC<Props> = ({ onAddressAdded, onClose, client }) => {
  const [countryId, setCountryId] = useState('');
  const [routeId, setRouteId] = useState('');
  const [address, setAddress] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [routes, setRoutes] = useState<DeliveryRoute[]>([]);
  const [defaultAddress, setDefaultAddress] = useState(true);
  

  const { toast } = useToast()

  useEffect(() => {
    getSession();
    fetchCountries();
  }, [])

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data) {
      getUserId(data.session?.user.id!)
      setCurrentUserId(data.session?.user.id!)
    }

  };

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

  const getUserId = async (userGuid: string) => {
    const { data } = await supabase.from("Users").select("id").eq("user_UID", userGuid);
    if (data) {
      setCurrentUserId(data[0].id);
    }
  }
  const addAddress = async () => {
    if (countryId.trim() && address.trim() && routeId.trim()) {
      const { error, data } = await supabase.from('Client_Address').insert({
        client_id: client.id,
        country_id: countryId,
        route_id: routeId,
        address: address,
        created_by: currentUserId
      })
      .select('id'); 
      
      if (error) {
        console.error('Error adding Address:', error);
        toast({
          title: "Ocurrió un error agregando la Dirección",
          duration: 3000,
          className: "bg-red-200"
        })
      } else {
        setCountryId('');
        setAddress('');
        setCountryId('');
        setRouteId('');
        onAddressAdded();
        onClose();

        let addressid =data[0]?.id;
        let clientid = client.id;
        if (addressid){
          
          const { error, data } = await supabase.rpc('setDefaultAddress', {
            clientid,
            addressid
          });
          console.log("🚀 ~ addAddress ~ data:", data)
      
          if (error) {
            console.error('Error setting default address:', error);
          } else {
            console.log('Default address updated successfully:', data);
          }
        }

        toast({
          title: "Dirección Agregada Correctamente",
          duration: 3000,
          className: "bg-green-200"
        })
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Agregar Nueva Dirección</h2>
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
      <button
        onClick={onClose}
        className="px-4 py-2 outline mr-3 mt-2 outline-offset-1 outline-cyan-500 text-black rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-200"
      >
        Descartar Cambios
      </button>
      <button
        onClick={addAddress}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        Agregar Dirección
      </button>

    </div>
  );
};

export default AddressForm;
