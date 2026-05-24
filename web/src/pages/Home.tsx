import { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import QRCode from 'react-qr-code';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { InfoWindowF } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '500px', borderRadius: '1rem' };
const center = { lat: -23.532, lng: -46.79 }; // Osasco
const obrasMock = [
  { id: 1, lat: -23.532, lng: -46.79, nome: 'Residencial Aurora', status: 'Em Andamento' },
  { id: 2, lat: -23.540, lng: -46.80, nome: 'Parque das Nações', status: 'Concluída' },
  { id: 3, lat: -23.525, lng: -46.77, nome: 'Edifício Central', status: 'Em Andamento' },
];

export default function Home() {
  const navigate = useNavigate();
  const [statusFiltro, setStatusFiltro] = useState('Todas');
  const [obras, setObras] = useState<any[]>(obrasMock);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  useEffect(() => {
    // Tenta buscar obras reais
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/api/obras`)
      .then(r => r.json())
      .then(data => {
        setObras(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Erro ao buscar obras no mapa da home', err);
        setObras([]);
      });
  });
  
  const obrasFiltradas = obras.filter(o => {
    return statusFiltro === 'Todas' || o.status === statusFiltro;
  });

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_KEY || "" // Deixa vazio se não tiver key, não quebra
  });

  return (
    <div className="pt-24">
      <Header />
      <main className="max-w-7xl mx-auto px-6">
        {/* HERO */}
        <section className="flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center mt-12">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
              Transparência <br className="hidden sm:block"/> em <span className="text-cv-blue" style={{textShadow: '0 0 20px #00D1FF'}}>cada <br className="hidden sm:block"/> tijolo.</span>
            </h1>
            <p className="text-gray-400 mt-6 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">
              Acompanhe a evolução de empreendimentos imobiliários em tempo real com dados auditáveis e <b className="text-white">realidade aumentada</b>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Link to="/obras" className="bg-white text-cv-dark px-6 py-3 rounded-full font-semibold text-center w-full sm:w-auto">Ver Obras</Link>
              <a href="#mapa" className="bg-cv-gray text-white px-6 py-3 rounded-full font-semibold text-center w-full sm:w-auto">Explorar Mapa</a>
            </div>
          </div>
          <div className="glass-card p-6 w-full max-w-md mx-auto">
            <h3 className="text-xl font-bold text-center lg:text-left">Obras na palma da mão</h3>
            <p className="text-sm text-gray-400 mt-2 text-center lg:text-left">Baixe o app oficial para visualizar modelos 3D das obras diretamente no local com Realidade Aumentada.</p>
            <div className="bg-white p-4 rounded-xl mt-6 mx-auto lg:mx-0 w-fit">
              <QRCode value="https://constructview.vercel.app/" size={128} />
            </div>
            <button className="bg-cv-blue text-cv-dark w-full mt-6 py-3 rounded-full font-bold shadow-glow-blue">Baixar App Mobile</button>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
          <div className="glass-card p-6 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-400">OBRAS MONITORADAS</p>
            <p className="text-4xl sm:text-5xl font-bold text-cv-green mt-2">3+</p>
          </div>
          <div className="glass-card p-6 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-400">CONSTRUTORAS PARCEIRAS</p>
            <p className="text-4xl sm:text-5xl font-bold text-cv-green mt-2">2+</p>
          </div>
          <div className="glass-card p-6 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-400">ACESSO LIVRE</p>
            <p className="text-4xl sm:text-5xl font-bold text-cv-blue mt-2">100%</p>
          </div>
        </section>

        {/* MAPA */}
        <section id="mapa" className="mt-20 mb-12">
          <div className="glass-card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">Mapa de Empreendimentos</h2>
              <div className="flex flex-wrap justify-center gap-2 bg-cv-gray p-1 rounded-3xl sm:rounded-full w-full sm:w-auto">
                <button onClick={() => setStatusFiltro('Todas')} className={`${statusFiltro === 'Todas' ? 'bg-cv-blue text-cv-dark' : 'text-gray-300'} px-4 py-1.5 rounded-full text-xs sm:text-sm transition flex-1 sm:flex-none whitespace-nowrap`}>Todas</button>
                <button onClick={() => setStatusFiltro('Em Andamento')} className={`${statusFiltro === 'Em Andamento' ? 'bg-cv-blue text-cv-dark' : 'text-gray-300'} px-4 py-1.5 rounded-full text-xs sm:text-sm transition flex-1 sm:flex-none whitespace-nowrap`}>Em Andamento</button>
                <button onClick={() => setStatusFiltro('Concluída')} className={`${statusFiltro === 'Concluída' ? 'bg-cv-blue text-cv-dark' : 'text-gray-300'} px-4 py-1.5 rounded-full text-xs sm:text-sm transition flex-1 sm:flex-none whitespace-nowrap`}>Concluída</button>
              </div>
            </div>
            {isLoaded? (
              <GoogleMap mapContainerStyle={containerStyle} center={obrasFiltradas.length > 0 ? { lat: obrasFiltradas[0].lat, lng: obrasFiltradas[0].lng } : center} zoom={13} options={{ styles: [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }] }}>
                {obrasFiltradas.map(o => (
                  <MarkerF 
                    key={o.id} 
                    position={{lat: o.lat || 0, lng: o.lng || 0}} 
                    onClick={() => setActiveMarker(o.id)}
                  >
                    {activeMarker === o.id && (
                      <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                        <div className="text-gray-900 p-2 min-w-[150px]">
                          <h3 className="font-bold text-lg mb-1">{o.nome}</h3>
                          <p className="text-sm mb-3">Status: {o.status}</p>
                          <button 
                            onClick={() => navigate(`/obras/${o.id}`)}
                            className="bg-cv-blue text-white px-4 py-1.5 rounded w-full font-bold hover:bg-cyan-600 transition"
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      </InfoWindowF>
                    )}
                  </MarkerF>
                ))}
              </GoogleMap>
            ) : <div className="h-[500px] bg-cv-gray rounded-xl animate-pulse" />}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
