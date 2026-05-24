import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiSearch, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px', borderRadius: '1rem' };
const center = { lat: -23.532, lng: -46.79 }; // Osasco

interface Obra {
  id: number;
  nome: string;
  construtora: string;
  progresso: number;
  status: string;
  lat: number;
  lng: number;
}

export default function Obras() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [busca, setBusca] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('Todas');
  const [obraSelecionada, setObraSelecionada] = useState<Obra | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY || ""
  });

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/api/obras`);
        setObras(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Erro ao buscar obras:', err);
        setObras([]);
      }
    };
    fetchObras();
  }, []);

  const obrasFiltradas = obras.filter(o => {
    const matchBusca = o.nome.toLowerCase().includes(busca.toLowerCase());
    const matchStatus = statusFiltro === 'Todas' || o.status === statusFiltro;
    return matchBusca && matchStatus;
  });

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Empreendimentos</h1>
        
        <div className="glass-card p-4 flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            {(FiSearch as any)({ className: "absolute left-4 top-3.5 text-gray-500" })}
            <input 
              placeholder="Buscar obra pelo nome..." 
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="w-full bg-cv-gray rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 ring-cv-blue" 
            />
          </div>
          <select 
            value={statusFiltro} 
            onChange={e => setStatusFiltro(e.target.value)} 
            className="bg-cv-gray rounded-full px-4 py-3 outline-none focus:ring-2 ring-cv-blue w-full md:w-auto"
          >
            <option value="Todas">Todas</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluída</option>
          </select>
        </div>

        {/* MAPA */}
        <div className="glass-card p-2 mb-8 relative">
          {isLoaded ? (
            <GoogleMap 
              mapContainerStyle={containerStyle} 
              center={obrasFiltradas.length > 0 ? { lat: obrasFiltradas[0].lat, lng: obrasFiltradas[0].lng } : center} 
              zoom={13} 
              options={{ styles: [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }] }}
            >
              {obrasFiltradas.map(o => (
                <MarkerF 
                  key={o.id} 
                  position={{lat: o.lat, lng: o.lng}} 
                  onClick={() => setObraSelecionada(o)}
                />
              ))}
            </GoogleMap>
          ) : <div className="h-[400px] bg-cv-gray rounded-xl animate-pulse" />}
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {obrasFiltradas.map(o => (
            <Link to={`/obras/${o.id}`} key={o.id} className="glass-card p-6 block hover:scale-105 transition duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{o.nome}</h3>
                  <p className="text-sm text-gray-400">{o.construtora}</p>
                </div>
                <span className="text-cv-green font-bold">{o.progresso}%</span>
              </div>
              <div className="w-full bg-cv-gray rounded-full h-2 mt-4">
                <div className="bg-cv-green h-2 rounded-full transition-all duration-1000" style={{ width: `${o.progresso}%` }}></div>
              </div>
            </Link>
          ))}
          {obrasFiltradas.length === 0 && (
            <p className="text-gray-400 col-span-3 text-center py-8">Nenhuma obra encontrada para estes filtros.</p>
          )}
        </div>
      </main>

      {/* MODAL DO MAPA */}
      {obraSelecionada && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-cv-dark glass-card p-6 rounded-2xl w-full max-w-md relative animate-fade-in shadow-glow-blue border border-white/10">
            <button 
              onClick={() => setObraSelecionada(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              {(FiX as any)({ className: "text-2xl" })}
            </button>
            <h2 className="text-2xl font-bold mb-1">{obraSelecionada.nome}</h2>
            <p className="text-gray-400 mb-4">{obraSelecionada.construtora}</p>
            
            <div className="bg-cv-gray p-4 rounded-xl mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Status</span>
                <span className={obraSelecionada.status === 'Concluída' ? 'text-cv-blue' : 'text-cv-green'}>{obraSelecionada.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Progresso</span>
                <span className="font-bold text-white">{obraSelecionada.progresso}%</span>
              </div>
            </div>

            <Link 
              to={`/obras/${obraSelecionada.id}`} 
              className="block text-center w-full bg-cv-blue text-cv-dark py-3 rounded-lg font-bold hover:scale-105 transition"
            >
              Ver Detalhes Completos
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
