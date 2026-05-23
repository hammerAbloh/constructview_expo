// src/pages/ObraDetalhe.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Etapa {
  nome: string;
  progresso: number;
}

interface EvolucaoItem {
  mes: string;
  progresso: number;
}

interface Obra {
  id: string;
  nome: string;
  descricao?: string;
  status: string;
  construtora: string;
  progresso: number;
  valorTotal?: string;
  engResponsavel?: string;
  nAlvara?: string;
  dataInicio?: string;
  previsao?: string;
  endereco?: string;
  lat?: number;
  lng?: number;
  fotos?: string[];
  etapas?: Etapa[];
  evolucao?: EvolucaoItem[] | string;
}

export default function ObraDetalhe() {
  const { id } = useParams<{ id: string }>();
  const [obra, setObra] = useState<Obra | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.getObra(id)
        .then((data: any) => {
          setObra({
            ...data,
            descricao: data.descricao || "Empreendimento com 3 torres, 180 unidades, e área de lazer completa.",
            engResponsavel: data.engResponsavel || "Eng. Lucas Martins",
            valorTotal: data.valorTotal || "R$ 45.000.000,00",
            dataInicio: data.dataInicio || "15/08/2023",
            previsao: data.previsao || "20/12/2025", // VÍRGULA TAVA FALTANDO AQUI
            endereco: data.endereco || "Av. das Nações, 1500, Osasco - SP",
            nAlvara: data.nAlvara || "2023/00456",
            etapas: data.etapas || [
              { nome: "Fundação", progresso: 100 },
              { nome: "Estrutura", progresso: 100 },
              { nome: "Alvenaria", progresso: 40 },
              { nome: "Acabamento", progresso: 0 }
            ]
          });
        })
        .catch((err) => {
          console.error("Erro ao buscar obra:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="p-6 text-center">Carregando...</div>;
  if (!obra) return <div className="p-6 text-center">Obra não encontrada</div>;

  let evolucao: EvolucaoItem[] = [];
  try {
    evolucao = typeof obra.evolucao === 'string'
      ? JSON.parse(obra.evolucao || '[]')
      : (obra.evolucao || []);
    if (!Array.isArray(evolucao)) evolucao = [];
  } catch (e) {
    console.error("Erro ao parsear evolução:", e);
    evolucao = [];
  }

  const lat = obra.lat || -23.5505;
  const lng = obra.lng || -46.6333;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-accent mb-2">{obra.nome}</h1>
      <p className="text-gray-400 mb-6">{obra.descricao}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          {obra.fotos && obra.fotos[0] && (
            <img
              src={obra.fotos[0]}
              alt={obra.nome}
              className="w-full h-80 object-cover rounded-lg shadow-lg border border-gray-800"
            />
          )}
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-bg-card p-4 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-sm">Status</p>
              <p className="font-bold text-lg">{obra.status}</p>
            </div>
            <div className="bg-bg-card p-4 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-sm">Construtora</p>
              <p className="font-bold text-lg">{obra.construtora}</p>
            </div>
            <div className="bg-bg-card p-4 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-sm">Progresso</p>
              <p className="font-bold text-lg text-accent">{obra.progresso}%</p>
            </div>
            <div className="bg-bg-card p-4 rounded-lg border border-gray-800">
              <p className="text-gray-400 text-sm">Valor Total</p>
              <p className="font-bold text-lg text-green-400">{obra.valorTotal}</p>
            </div>
          </div>

          <div className="mt-4 bg-bg-card p-4 rounded-lg border border-gray-800">
            <h3 className="font-bold mb-3">Detalhes do Projeto</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-400 block">Eng. Responsável:</span> {obra.engResponsavel}</div>
              <div><span className="text-gray-400 block">Nº do Alvará:</span> {obra.nAlvara}</div>
              <div><span className="text-gray-400 block">Início:</span> {obra.dataInicio}</div>
              <div><span className="text-gray-400 block">Previsão:</span> {obra.previsao}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-bg-card p-4 rounded-lg border border-gray-800 h-full flex flex-col">
            <h3 className="font-bold mb-2">Localização</h3>
            <p className="text-sm text-gray-400 mb-4">{obra.endereco}</p>
            <div className="rounded-lg overflow-hidden flex-1 min-h-[300px] border border-gray-800">
              <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lat, lng]}>
                  <Popup>{obra.nome}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-bg-card p-6 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold text-accent mb-4">Etapas da Obra</h2>
          <div className="space-y-6">
            {obra.etapas && obra.etapas.map((etapa, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold">{etapa.nome}</span>
                  <span className="font-bold text-accent">{etapa.progresso}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${etapa.progresso}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bg-card p-6 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold text-accent mb-6">Evolução da Obra</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolucao} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEvolucao" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="mes" stroke="#888" tickLine={false} axisLine={false} />
                <YAxis stroke="#888" tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                  formatter={(value: any) => [`${Number(value) || 0}%`, 'Progresso']}
                />
                <Area
                  type="monotone"
                  dataKey="progresso"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorEvolucao)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {obra.fotos && obra.fotos.length > 1 && (
        <div>
          <h2 className="text-2xl font-bold text-accent mb-4">Galeria</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {obra.fotos.slice(1).map((foto, idx) => (
              <img
                key={idx}
                src={foto}
                alt={`Foto ${idx + 2}`}
                className="w-full h-32 object-cover rounded-lg border border-gray-800"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}