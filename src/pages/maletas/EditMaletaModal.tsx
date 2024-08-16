import React, { useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useToast } from "@/components/ui/use-toast"
import Maleta from '@/interfaces/maleta';
import { useUserStore } from '@/store/user.store';

interface Props {
  maletaRecord: Maleta;
  onClose: () => void;
}

const EditMaletaModal: React.FC<Props> = ({ maletaRecord, onClose }) => {
  const [name, setName] = useState(maletaRecord.name);
  const [descripcion, setDescripcion] = useState(maletaRecord.descripcion);
  const [pesoTara, setPesoTara] = useState(maletaRecord.pesoTara);
  const [pesoMax, setPesoMax] = useState(maletaRecord.pesoMax);
  const [anchoCM, setAnchoCM] = useState(maletaRecord.anchoCM);
  const [altoCM, setAltoCM] = useState(maletaRecord.altoCM);
  const [largoCM, setLargoCM] = useState(maletaRecord.largoCM)
  const { toast } = useToast()
  const { user } = useUserStore();

  const handleDecimalInput = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: number) => void) => {
    const value = e.target.value;
    // Permitir solo números y un máximo de dos decimales
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setter(parseFloat(value));
    }
  };

  const updateMaleta = async () => {
    const { error } = await supabase
      .from('Maletas')
      .update({
        name, pesoTara, pesoMax, anchoCM, altoCM, largoCM,
        created_by: user?.id
      })
      .eq('id', maletaRecord.id);

    if (error) {
      console.error('Error updating maleta:', error);
      toast({
        title: "Ocurrió un error actualizando la maleta",
        duration: 3000,
        className: "bg-red-200"
      })
    } else {

      toast({
        title: "Maleta Actualizada Correctamente",
        duration: 3000,
        className: "bg-green-200"
      })

      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Maleta</h2>

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
            onChange={(e) => handleDecimalInput(e, setPesoTara)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Peso Máximo (Lb)</label>
          <input
            type="text"
            value={pesoMax}
            onChange={(e) => handleDecimalInput(e, setPesoMax)}
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
            onChange={(e) => handleDecimalInput(e, setAnchoCM)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Alto (cm)</label>
          <input
            type="text"
            value={altoCM}
            onChange={(e) => handleDecimalInput(e, setAltoCM)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Largo (cm)</label>
          <input
            type="text"
            value={largoCM}
            onChange={(e) => handleDecimalInput(e, setLargoCM)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 outline mr-3 mt-2 outline-offset-1 outline-cyan-500 text-black rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-200"
          >
            Descartar Cambios
          </button>
          <button
            onClick={updateMaleta}
            className="mr-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Guardar
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditMaletaModal;
