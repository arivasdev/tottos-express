import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Country from '@/interfaces/country';
import DeliveryRoute from '@/interfaces/deliveryRoute';

const DeliveryRoutes: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [routes, setRoutes] = useState<DeliveryRoute[]>([]);
  const [routeName, setRouteName] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      const { data, error } = await supabase.from<Country>('Countries').select('*');
      if (error) {
        console.error('Error fetching countries:', error);
      } else {
        setCountries(data || []);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchRoutes = async () => {
        const { data, error } = await supabase
          .from<DeliveryRoute>('DeliveryRoutes')
          .select('*')
          .eq('countryId', selectedCountry);

        if (error) {
          console.error('Error fetching routes:', error);
        } else {
          setRoutes(data || []);
        }
      };

      fetchRoutes();
    }
  }, [selectedCountry]);

  const addRoute = async () => {
    if (selectedCountry && routeName.trim()) {
      const { error } = await supabase.from('DeliveryRoutes').insert({
        name: routeName,
        countryId: selectedCountry,
        isActive: true,
      });

      if (error) {
        console.error('Error adding route:', error);
      } else {
        setRouteName('');
        const { data, error: fetchError } = await supabase
          .from<DeliveryRoute>('DeliveryRoutes')
          .select('*')
          .eq('countryId', selectedCountry);

        if (fetchError) {
          console.error('Error fetching routes:', fetchError);
        } else {
          setRoutes(data || []);
        }
      }
    }
  };

  const toggleRouteStatus = async (routeId: string) => {
    const route = routes.find((r) => r.id === routeId);
    if (route) {
      const { error } = await supabase
        .from('DeliveryRoutes')
        .update({ isActive: !route.isActive })
        .eq('id', routeId);

      if (error) {
        console.error('Error updating route status:', error);
      } else {
        const { data, error: fetchError } = await supabase
          .from<DeliveryRoute>('DeliveryRoutes')
          .select('*')
          .eq('countryId', selectedCountry);

        if (fetchError) {
          console.error('Error fetching routes:', fetchError);
        } else {
          setRoutes(data || []);
        }
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rutas de Entrega</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar País</label>
        <select
          value={selectedCountry || ''}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Selecciona un país</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Ruta</label>
            <input
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={addRoute}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              Agregar Ruta
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Mostrar Solo Activas</label>
            <input
              type="checkbox"
              checked={showActiveOnly}
              onChange={() => setShowActiveOnly(!showActiveOnly)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {routes
              .filter((route) => (showActiveOnly ? route.isActive : true))
              .map((route) => (
                <div key={route.id} className="bg-white shadow-md rounded-lg p-4">
                  <h2 className="text-lg font-bold">{route.name}</h2>
                  <p>ID: {route.id}</p>
                  <p>País: {countries.find((country) => country.id === route.countryId)?.name}</p>
                  <p>Estado: {route.isActive ? 'Activo' : 'Inactivo'}</p>
                  <button
                    onClick={() => toggleRouteStatus(route.id)}
                    className={`mt-2 px-4 py-2 rounded ${
                      route.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    } text-white focus:outline-none`}
                  >
                    {route.isActive ? 'Desactivar Ruta' : 'Activar Ruta'}
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DeliveryRoutes;
