// src/pages/Investimento.tsx
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

export default function Investimento() {
  const [obras, setObras] = useState<any[]>([]);

  useEffect(() => {
    api.getObras().then(data => {
      const comRoi = data.filter((o: any) => o.roi && o.roi > 0);
      setObras(comRoi);
    });
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-accent mb-6">Oportunidades de Investimento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {obras.map(obra => (
          <div key={obra.id} className="bg-bg-card rounded-lg p-5 border border-gray-800 flex flex-col justify-between">
            <div>
              <img src={obra.fotos && obra.fotos[0]} alt={obra.nome} className="w-full h-40 object-cover rounded-md mb-4" />
              <h2 className="text-2xl font-bold text-accent mb-2">{obra.nome}</h2>
              <p className="text-gray-300 mb-1">Status: {obra.status}</p>
              <p className="text-gray-300 mb-1">Construtora: {obra.construtora}</p>
              <div className="mt-4 mb-4 p-3 bg-gray-800 rounded">
                <span className="block text-sm text-gray-400">ROI Estimado</span>
                <span className="text-2xl font-bold text-green-400">+{obra.roi}%</span>
              </div>
            </div>
            <Link to={`/obra/${obra.id}`} className="bg-accent text-center text-white font-bold py-3 rounded-lg hover:bg-opacity-80 transition-colors">
              Investir Agora
            </Link>
          </div>
        ))}
        {obras.length === 0 && <p className="text-gray-400">Nenhuma oportunidade disponível no momento.</p>}
      </div>
    </div>
  );
}
