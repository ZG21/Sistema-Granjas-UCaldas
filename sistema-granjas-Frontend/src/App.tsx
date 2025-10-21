import { useEffect, useState } from 'react';
import { addPending, getAllPending } from './services/indexedDB';
import { syncPendingData } from './services/sync';

function App() {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  useEffect(() => {
    // Escuchar cuando vuelva la conexión
    const handleOnline = () => {
      console.log('🌐 Conexión restablecida. Iniciando sincronización...');
      syncPendingData();
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      tipo: 'granja',
      data: {
        nombre,
        ubicacion,
      },
    };

    // Si no hay conexión → guardar en IndexedDB
    if (!navigator.onLine) {
      await addPending(data);
      console.log('📦 Datos guardados localmente (sin conexión):', data);
      setNombre('');
      setUbicacion('');
      return;
    }

    // Si hay conexión → también podrías enviarlos directamente al backend
    console.log('🌐 Hay conexión, aquí podrías hacer fetch directo al backend');
  };

  const verPendientes = async () => {
    const pendientes = await getAllPending();
    console.log('📥 Pendientes en IndexedDB:', pendientes);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-green-800">
      <h1 className="text-2xl font-bold mb-4">🌱 Sistema de Granjas</h1>
      <form
        onSubmit={handleSave}
        className="bg-white shadow-lg p-4 rounded-lg flex flex-col gap-2 w-80"
      >
        <input
          type="text"
          placeholder="Nombre de la granja"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="border rounded p-2"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Guardar
        </button>
      </form>

      <button
        onClick={verPendientes}
        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Ver datos pendientes
      </button>
    </div>
  );
}

export default App;
