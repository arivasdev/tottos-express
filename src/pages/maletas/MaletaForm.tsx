import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { useUserStore } from '@/store/user.store';

interface Props {
  onMaletaAdded: () => void;
  onClose: () => void;
}

const MaletaForm: React.FC<Props> = ({ onMaletaAdded, onClose }) => {
  const [name, setName] = useState('');
  const [pesoTara, setPesoTara] = useState('');
  const [pesoMax, setPesoMax] = useState('');
  const [anchoCM, setAnchoCM] = useState('');
  const [altoCM, setAltoCM] = useState('');
  const [largoCM, setLargoCM] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [currentUserId, setCurrentUserId] = useState('');

  const { user } = useUserStore();

  const { toast } = useToast()

  useEffect(() => {
    console.log("Store user, ", user)
    getSession()
  }, [])

  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    if (data) {
      getUserId(data.session?.user.id!)
      setCurrentUserId(data.session?.user.id!)
    }

  };

  const getUserId = async (userGuid: string) => {
    const { data } = await supabase.from("Users").select("id").eq("user_UID", userGuid);
    if (data) {
      setCurrentUserId(data[0].id);
      console.log("Current user, ", data[0].id)
    }
  }
  const addMaleta = async () => {
    if (name.trim()) {
      const { error } = await supabase.from('Maletas').insert({
        name,
        created_by: currentUserId,
        descripcion,
        pesoMax,
        pesoTara,
        anchoCM,
        altoCM,
        largoCM
      });

      if (error) {
        console.error('Error adding maleta:', error);
        toast({
          title: "Ocurrió un error agregando la Maleta",
          duration: 3000,
          className: "bg-red-200"
        })
      } else {
        setName('');
        setDescripcion('');
        setPesoMax('');
        setPesoTara('');
        setAltoCM('');
        setAnchoCM('');
        setLargoCM('');

        onMaletaAdded();
        onClose();

        toast({
          title: "Maleta Agregada Correctamente",
          duration: 3000,
          className: "bg-green-200"
        })
      }
    }
  };

  const handlePesoChange = (e: React.ChangeEvent<HTMLInputElement>, setMethod: (value: string) => void) => {
    const value = e.target.value;
    // Permitir solo números y un máximo de dos decimales
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setMethod(value);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Agregar Nueva Maleta</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción (opcional)</label>
        <input
          type="text"
          value={descripcion}
          placeholder='Escribe información que describa la maleta visualmente'
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso Tara (Libras)</label>
          <input
            type="text"
            value={pesoTara}
            onChange={(e) => handlePesoChange(e, setPesoTara)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso Máximo (Lb)</label>
          <input
            type="text"
            value={pesoMax}
            onChange={(e) => handlePesoChange(e, setPesoMax)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex space-x-4 mb-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Ancho (cm)</label>
          <input
            type="text"
            value={anchoCM}
            onChange={(e) => handlePesoChange(e, setAnchoCM)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Alto (cm)</label>
          <input
            type="text"
            value={altoCM}
            onChange={(e) => handlePesoChange(e, setAltoCM)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Largo (cm)</label>
          <input
            type="text"
            value={largoCM}
            onChange={(e) => handlePesoChange(e, setLargoCM)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <button
        onClick={onClose}
        className="px-4 py-2 outline mr-3 mt-2 outline-offset-1 outline-cyan-500 text-black rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-200"
      >
        Descartar
      </button>
      <button
        onClick={addMaleta}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        Agregar Maletae
      </button>

    </div>
  );
};

export default MaletaForm;
