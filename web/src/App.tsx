import { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import QRCode from 'react-qr-code';

const mapContainerStyle = { width: '100%', height: '100%', borderRadius: '1rem' };
const center = { lat: -23.532, lng: -46.791 }; // Osasco

const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "water", stylers: [{ color: "#17263c" }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] }
];

function App() {
  const [stats, setStats] = useState({ total_obras: 0, total_construtoras: 0 });
  const [obras, setObras] = useState([{ id: 1, nome: "Residencial Teste", lat: -23.53, lng: -46.79 }]);

  useEffect(() => {
    fetch('http://localhost:3000/api/home/numeros-gerais')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats({ total_obras: 124, total_construtoras: 32 }));
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white p-4 md:p-8">
      <section className="max-w-6xl mx-auto mb-12">
        <div className="glass rounded-3xl p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Transparência em <span className="text-neon-blue">Obras</span>
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            Acompanhe em tempo real a evolução de empreendimentos na sua cidade.
            Dados, fotos e realidade aumentada na palma da mão.
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <button className="bg-neon-blue hover:bg-cyan-400 text-black font-bold py-4 px-8 rounded-xl transition-all hover:scale-105">
              Baixe o App
            </button>
            <div className="glass p-4 rounded-xl">
              <p className="text-sm text-gray-400 mb-2">QR Code do Tapume</p>
              <div className="bg-white p-2 rounded-lg">
                <QRCode value="https://constructview.app/obra/1" size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-2xl p-6">
          <p className="text-gray-400">Obras Monitoradas</p>
          <p className="text-4xl font-bold text-neon-green">{stats.total_obras}+</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-gray-400">Construtoras</p>
          <p className="text-4xl font-bold text-neon-green">{stats.total_construtoras}+</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-gray-400">Modo Noturno</p>
          <p className="text-4xl font-bold text-neon-blue">Dark</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-12">
        <div className="glass rounded-3xl p-2 h-96">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY || ""}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
              options={{
                styles: darkMapStyle,
                disableDefaultUI: true,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                backgroundColor: '#242f3e'
              }}
            >
            </GoogleMap>
          </LoadScript>
        </div>
      </section>
    </div>
  );
}

export default App;