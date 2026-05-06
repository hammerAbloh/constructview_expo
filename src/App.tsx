import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { QRCodeSVG } from 'qrcode.react';
import { FiMenu, FiX, FiSearch, FiLogOut, FiDownload, FiFileText, FiMail, FiLinkedin, FiInstagram, FiInfo, FiEye, FiEyeOff, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const IconMenu = FiMenu as any;
const IconX = FiX as any;
const IconSearch = FiSearch as any;
const IconLogOut = FiLogOut as any;
const IconDownload = FiDownload as any;
const IconFileText = FiFileText as any;
const IconMail = FiMail as any;
const IconLinkedin = FiLinkedin as any;
const IconInstagram = FiInstagram as any;
const IconInfo = FiInfo as any;
const IconEye = FiEye as any;
const IconEyeOff = FiEyeOff as any;
const IconCheck = FiCheck as any;
const IconArrowLeft = FiArrowLeft as any;

const mapContainerStyle = { width: '100%', height: '100%', borderRadius: '1rem' };
const center = { lat: -23.532, lng: -46.791 };
const darkMapStyle = [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }, { featureType: "water", stylers: [{ color: "#17263c" }] }, { featureType: "poi", stylers: [{ visibility: "off" }] }, { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] }];

const MOCK_OBRAS = [
  {
    id: 1, nome: "Residencial Aurora", lat: -23.53, lng: -46.79, progresso: 68, construtora: "Construtora Alfa", status: "Em Andamento", risco: "No prazo", roi: 22,
    fotos: ["https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800", "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800", "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800"],
    evolucao: [{ mes: "Jan", progresso: 10 }, { mes: "Fev", progresso: 25 }, { mes: "Mar", progresso: 45 }, { mes: "Abr", progresso: 68 }]
  },
  {
    id: 2, nome: "Parque das Nações", lat: -23.525, lng: -46.77, progresso: 34, construtora: "Beta Engenharia", status: "Em Andamento", risco: "Atrasada", roi: 8,
    fotos: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800", "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800"],
    evolucao: [{ mes: "Jan", progresso: 5 }, { mes: "Fev", progresso: 15 }, { mes: "Mar", progresso: 25 }, { mes: "Abr", progresso: 34 }]
  },
  {
    id: 3, nome: "Edifício Central", lat: -23.54, lng: -46.80, progresso: 100, construtora: "Construtora Alfa", status: "Concluída", risco: "No prazo", roi: 18,
    fotos: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?w=800"],
    evolucao: [{ mes: "Jan", progresso: 40 }, { mes: "Fev", progresso: 70 }, { mes: "Mar", progresso: 90 }, { mes: "Abr", progresso: 100 }]
  }
];

const EQUIPE = [
  {
    nome: "Lucas Pinheiro de Souza",
    cargo: "Desenvolvedor Full Stack",
    foto: "/team/lucas.jpg",
    linkedin: "https://linkedin.com/in/lucas-pinheiro-souza",
    instagram: "https://instagram.com/xlucasx.pds",
    email: "mailto:xlucasx.pds@gmail.com"
  },
  {
    nome: "Giovanna Braz Ghermacovski",
    cargo: "Desenvolvedora Mobile",
    foto: "/team/giovanna.jpg",
    linkedin: "https://www.linkedin.com/in/giovanna-braz-ghermacovski",
    instagram: "https://instagram.com/gibrazxw_",
    email: "mailto:gibraz.2006@gmail.com"
  },
  {
    nome: "Anne Marie Lambert",
    cargo: "Frontend Developer",
    foto: "/team/anne.jpg",
    linkedin: "https://www.linkedin.com/in/anne-marie-lambert",
    instagram: "https://instagram.com/amarie_dx",
    email: "mailto:annemlambert82@gmail.com"
  },
  {
    nome: "Guilherme Ferreira de Sousa",
    cargo: "Database Architect",
    foto: "/team/guilherme.jpg",
    linkedin: "https://www.linkedin.com/in/guilherme-ferreira",
    instagram: "https://instagram.com/gferre.ira",
    email: "mailto:guilfs06@gmail.com"
  }
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled
      ? 'glass border-b border-zinc-800'
      : 'bg-[#050505]/95 backdrop-blur-md border-b border-zinc-900'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-3xl font-bold tracking-tight">Construct<span className="text-neon-blue">View</span></Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-neon-blue font-medium transition">Home</Link>
            <Link to="/obras" className="text-gray-300 hover:text-neon-blue font-medium transition">Obras</Link>
            <Link to="/sobre" className="text-gray-300 hover:text-neon-blue font-medium transition">Sobre</Link>
            <Link to="/perfil" className="text-gray-300 hover:text-neon-blue font-medium transition">Minha Conta</Link>
            <Link to="/login" className="bg-neon-blue text-black font-bold px-6 py-2.5 rounded-full hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2">
              <IconLogOut /> Portal do Gestor
            </Link>
          </nav>
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden glass border-t border-zinc-800">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-neon-blue font-medium">Home</Link>
              <Link to="/obras" onClick={() => setMenuOpen(false)} className="hover:text-neon-blue font-medium">Obras</Link>
              <Link to="/sobre" onClick={() => setMenuOpen(false)} className="hover:text-neon-blue font-medium">Sobre</Link>
              <Link to="/perfil" onClick={() => setMenuOpen(false)} className="hover:text-neon-blue font-medium">Minha Conta</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-neon-blue text-black font-bold px-4 py-3 rounded-xl text-center">Portal do Gestor</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[100]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neon-blue font-medium tracking-widest animate-pulse uppercase text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {children}
      <Footer />
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="glass-dark border-t border-zinc-800/50 mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Construct<span className="text-neon-blue">View</span></h3>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed mx-auto md:mx-0">Transparência em cada tijolo. Do QR ao AR.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white uppercase text-sm tracking-wider">Produto</h4>
            <div className="space-y-3 text-sm">
              <Link to="/demo" className="block text-gray-400 hover:text-neon-blue transition">Ver Demo</Link>
              <a href="/app-release.apk" className="block text-gray-400 hover:text-neon-blue transition">Baixar App Android</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white uppercase text-sm tracking-wider">TCC 2026</h4>
            <p className="text-gray-400 text-sm mb-2">Engenharia de Software</p>
            <p className="text-gray-400 text-sm">Faculdade Expo</p>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-gray-500 text-xs tracking-wide">
          © 2026 ConstructView. Escaneie o QR. Construa o futuro.
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const [stats, setStats] = useState({ total_obras: 0, total_construtoras: 0 });
  const [filtroMapa, setFiltroMapa] = useState('Todas');
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || "" });

  useEffect(() => {
    fetch('http://localhost:3000/api/home/numeros-gerais')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats({ total_obras: MOCK_OBRAS.length, total_construtoras: 2 }));
  }, []);

  const pinsFiltrados = MOCK_OBRAS.filter(o => filtroMapa === 'Todas' || o.status === filtroMapa);

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 p-4 md:p-8">
        <section className="max-w-6xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass rounded-[3rem] p-8 md:p-20 relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-zinc-800/80"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/15 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-green/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
                  Transparência em <span className="text-neon-blue drop-shadow-[0_0_20px_rgba(0,217,255,0.4)]">cada tijolo.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 mb-10 leading-relaxed max-w-2xl font-light">
                  Acompanhe a evolução de empreendimentos imobiliários em tempo real com dados auditáveis e <span className="text-white font-medium">realidade aumentada</span>.
                </p>
                <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                  <button onClick={() => navigate('/obras')} className="bg-white hover:bg-gray-200 text-black font-bold text-lg py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all transform hover:scale-105">
                    Ver Obras
                  </button>
                  <button onClick={() => {
                    const el = document.getElementById('mapa-obras');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }} className="glass text-white font-bold text-lg py-4 px-10 rounded-full hover:bg-white/10 transition-all border border-zinc-700 transform hover:scale-105">
                    Explorar Mapa
                  </button>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full md:w-[400px]"
              >
                <QrCard obraId={1} />
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:border-neon-blue transition-all duration-300" onClick={() => navigate('/obras')}>
            <p className="text-gray-400 font-medium uppercase tracking-wider text-sm mb-2">Obras Monitoradas</p>
            <p className="text-5xl font-extrabold text-neon-green">{stats.total_obras}+</p>
          </div>
          <div className="glass rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 border border-zinc-800/80">
            <p className="text-gray-400 font-medium uppercase tracking-wider text-sm mb-2">Construtoras Parceiras</p>
            <p className="text-5xl font-extrabold text-neon-green">{stats.total_construtoras}+</p>
          </div>
          <div className="glass rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 border border-zinc-800/80">
            <p className="text-gray-400 font-medium uppercase tracking-wider text-sm mb-2">Acesso Livre</p>
            <p className="text-5xl font-extrabold text-neon-blue">100%</p>
          </div>
        </section>
        <section id="mapa-obras" className="max-w-6xl mx-auto">
          <div className="glass rounded-3xl p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-center px-2 gap-4">
              <h2 className="text-2xl font-bold">Mapa de Empreendimentos</h2>
              <div className="flex gap-2 bg-zinc-900 p-1 rounded-full border border-zinc-800">
                {['Todas', 'Em Andamento', 'Concluída'].map(f => (
                  <button key={f} onClick={() => setFiltroMapa(f)} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filtroMapa === f ? 'bg-neon-blue text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[500px] w-full rounded-2xl overflow-hidden relative shadow-inner">
              {isLoaded ? (
                <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={13} options={{ styles: darkMapStyle, disableDefaultUI: true, mapTypeControl: false, streetViewControl: false, fullscreenControl: false, backgroundColor: '#050505' }}>
                  {pinsFiltrados.map(obra => (<Marker key={obra.id} position={{ lat: obra.lat, lng: obra.lng }} onClick={() => navigate(`/obra/${obra.id}`)} />))}
                </GoogleMap>
              ) : (
                <div className="w-full h-full bg-zinc-900 rounded-2xl animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

function ListaObras() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [construtoraFiltro, setConstrutoraFiltro] = useState("Todas");

  const construtoras = ["Todas", ...Array.from(new Set(MOCK_OBRAS.map(o => o.construtora)))];

  const obrasFiltradas = MOCK_OBRAS.filter(o => {
    const matchBusca = o.nome.toLowerCase().includes(busca.toLowerCase());
    const matchConstrutora = construtoraFiltro === "Todas" || o.construtora === construtoraFiltro;
    return matchBusca && matchConstrutora;
  });

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Obras Monitoradas</h1>

          <div className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 flex items-center gap-3 w-full border border-zinc-700 bg-zinc-900/50 rounded-xl px-4 py-3">
              <IconSearch className="text-gray-400 text-xl" />
              <input type="text" placeholder="Buscar obra pelo nome..." value={busca} onChange={e => setBusca(e.target.value)} className="bg-transparent w-full outline-none text-white placeholder-gray-500" />
            </div>
            <select value={construtoraFiltro} onChange={e => setConstrutoraFiltro(e.target.value)} className="w-full md:w-64 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-neon-blue">
              {construtoras.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {obrasFiltradas.length > 0 ? obrasFiltradas.map(obra => (
              <div key={obra.id} onClick={() => navigate(`/obra/${obra.id}`)} className="glass rounded-2xl p-6 cursor-pointer hover:scale-105 transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{obra.nome}</h3>
                    <span className="text-neon-green font-bold">{obra.progresso}%</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{obra.construtora}</p>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div className="bg-neon-green h-2 rounded-full" style={{ width: `${obra.progresso}%` }}></div>
                </div>
              </div>
            )) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400">
                <span className="text-5xl mb-4">😢</span>
                <p className="text-lg">Nenhuma obra encontrada para esta busca.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function ObraDetalhe() {
  const { id } = useParams();
  const [showRA, setShowRA] = useState(false);
  const obra = MOCK_OBRAS.find(o => o.id === Number(id));

  if (!obra) return <NotFound />;

  const feed = [{ data: "04/05/2026", texto: "Concretagem do 12º andar finalizada" }, { data: "01/05/2026", texto: "Chegada de novo lote de materiais" }, { data: "28/04/2026", texto: "Instalação elétrica do 10º andar" }];
  const documentos = ["Alvará de Construção.pdf", "Relatório de Impacto Ambiental.pdf", "Planta Baixa Aprovada.pdf"];

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <Link to="/obras" className="text-neon-blue hover:text-cyan-400 font-medium mb-6 flex items-center gap-2 transition w-fit"><IconArrowLeft /> Voltar para Obras</Link>
          <div className="glass rounded-3xl p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{obra.nome}</h1>
                <p className="text-gray-400">{obra.construtora} • Av. dos Autonomistas, 2500 - Osasco</p>
              </div>
              <div className="flex gap-4 mt-4 md:mt-0">
                <button onClick={() => alert("Funcionalidade Premium")} className="glass text-white font-bold py-3 px-6 rounded-xl hover:bg-zinc-800 transition shadow-lg flex items-center gap-2">
                  <IconDownload /> Relatório PDF
                </button>
                <button onClick={() => setShowRA(true)} className="bg-neon-blue hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl shadow-lg shadow-neon-blue/20">Ver em RA 📱</button>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Progresso da Obra</span>
                <span className="text-neon-green font-bold">{obra.progresso}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-3">
                <div className="bg-neon-green h-3 rounded-full transition-all duration-1000" style={{ width: `${obra.progresso}%` }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="glass rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-6">Evolução da Obra</h2>
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={obra.evolucao}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="mes" stroke="#a1a1aa" axisLine={false} tickLine={false} />
                    <YAxis stroke="#a1a1aa" domain={[0, 100]} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', color: '#fff' }} />
                    <Line type="monotone" dataKey="progresso" stroke="#00FF85" strokeWidth={4} dot={{ r: 6, fill: '#00FF85', strokeWidth: 0 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">Documentos Públicos</h2>
              <p className="text-gray-400 text-sm mb-6">Acesse os relatórios e alvarás disponíveis para esta obra, garantindo total transparência no processo.</p>
              <div className="space-y-3">
                {documentos.map((doc, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition cursor-pointer group" onClick={() => alert(`Baixando ${doc}...`)}>
                    <div className="flex items-center gap-3">
                      <IconFileText className="text-neon-blue text-xl" />
                      <span className="text-sm font-medium text-gray-200 group-hover:text-white">{doc}</span>
                    </div>
                    <IconDownload className="text-gray-400 group-hover:text-neon-blue transition" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">Fotos Recentes</h2>
              <div className="grid grid-cols-2 gap-4">
                {obra.fotos.map((foto, i) => (<img key={i} src={foto} alt={`Foto ${i + 1} da obra ${obra.nome}`} className="rounded-xl h-48 w-full object-cover border border-zinc-800 hover:border-neon-blue transition" />))}
              </div>
            </div>
            <div className="glass rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-4">Feed de Atualizações</h2>
              <div className="space-y-6 mt-6">
                {feed.map((item, i) => (
                  <div key={i} className="border-l-2 border-neon-blue pl-4 relative">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-neon-blue rounded-full"></div>
                    <p className="text-sm text-neon-blue font-bold mb-1">{item.data}</p>
                    <p className="text-gray-200">{item.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-[3rem] p-8 md:p-12 mb-8 border border-zinc-800 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Projeção de Valorização (ROI)</h2>
                <p className="text-gray-400 max-w-2xl leading-relaxed">Acompanhe o crescimento do valor do seu investimento em relação ao custo de obra ao longo do tempo. Modelo atualizado com base no INCC e progresso físico.</p>
              </div>
              <div className="text-left md:text-right bg-zinc-900/60 backdrop-blur-md px-8 py-6 rounded-3xl border border-zinc-800/80 shadow-2xl">
                <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">ROI Projetado</p>
                <p className="text-5xl font-black text-neon-green drop-shadow-[0_0_15px_rgba(0,255,133,0.3)]">+{obra.roi}%</p>
              </div>
            </div>
            <div className="w-full h-[450px] relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { mes: "Jan", Custo: 100000, Valorizacao: 105000 },
                  { mes: "Fev", Custo: 150000, Valorizacao: 162000 },
                  { mes: "Mar", Custo: 200000, Valorizacao: 220000 },
                  { mes: "Abr", Custo: 250000, Valorizacao: 285000 },
                  { mes: "Mai", Custo: 300000, Valorizacao: 350000 },
                  { mes: "Jun", Custo: 350000, Valorizacao: 427000 }
                ]}>
                  <defs>
                    <linearGradient id="colorValorizacao" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF85" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#00FF85" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCusto" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="mes" stroke="#71717a" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 500 }} dy={10} />
                  <YAxis stroke="#71717a" axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value / 1000}k`} tick={{ fontSize: 14, fontWeight: 500 }} dx={-10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', padding: '16px' }}
                    itemStyle={{ fontWeight: 'bold' }}
                    formatter={(value: any) => `R$ ${Number(value).toLocaleString('pt-BR')}`}
                  />
                  <Area type="monotone" dataKey="Valorizacao" stroke="#00FF85" fillOpacity={1} fill="url(#colorValorizacao)" strokeWidth={4} filter="url(#glow)" />
                  <Area type="monotone" dataKey="Custo" stroke="#A855F7" fillOpacity={1} fill="url(#colorCusto)" strokeWidth={3} />
                  <Legend verticalAlign="top" height={50} iconType="circle" wrapperStyle={{ paddingBottom: '30px', fontWeight: 'bold', fontSize: '14px' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
      {showRA && (
        <div className="fixed inset-0 bg-[#050505]/90 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowRA(false)}>
          <div className="glass rounded-3xl p-8 max-w-md text-center border border-zinc-700 shadow-[0_0_50px_rgba(0,217,255,0.2)]" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-4">Realidade Aumentada</h3>
            <p className="text-gray-300 mb-6">Aponte a câmera do aplicativo para o QR Code abaixo para visualizar o modelo 3D diretamente no local da obra.</p>
            <div className="bg-white p-4 rounded-2xl inline-block shadow-lg">
              <QRCodeSVG value={`constructview://obra/${id}`} size={180} />
            </div>
            <button onClick={() => setShowRA(false)} className="mt-8 bg-zinc-800 hover:bg-zinc-700 px-8 py-3 rounded-xl font-bold transition w-full border border-zinc-600">Fechar AR</button>
          </div>
        </div>
      )}
    </PageTransition>
  );
}

function Sobre() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-28 p-4 md:p-8">
        <div className="max-w-4xl mx-auto glass rounded-[2rem] p-8 md:p-12 border border-zinc-800">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Sobre o Construct<span className="text-neon-blue">View</span></h1>
          <p className="text-lg text-gray-300 mb-4">Plataforma de transparência em obras públicas e privadas usando QR Code, Realidade Aumentada e dados abertos.</p>

          <h2 className="text-2xl font-bold mt-12 mb-4 text-neon-blue">Por que ConstructView?</h2>
          <p className="text-gray-300 mb-4">O mercado de construção civil movimenta R$ 2.1 trilhões no Brasil, mas 67% dos investidores não têm acesso a dados em tempo real. Atrasos custam em média 23% do orçamento. Nossa plataforma resolve isso com QR Codes nos tapumes, RA para visualização 3D e dashboards que traduzem dados técnicos em ROI claro.</p>
          <p className="text-gray-300 mb-8">Tanto o cidadão comum quanto o investidor qualificado conseguem fiscalizar e investir com transparência total.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-neon-blue">Stack Técnica</h2>
          <ul className="space-y-2 text-gray-300 mb-12">
            <li>• <span className="text-white">Frontend:</span> React + TypeScript + TailwindCSS + React Router + Recharts</li>
            <li>• <span className="text-white">Backend:</span> Node.js + Express + Prisma</li>
            <li>• <span className="text-white">Banco:</span> PostgreSQL com extensão PostGIS</li>
            <li>• <span className="text-white">APIs:</span> Google Maps, QR Code, Tippy.js</li>
            <li>• <span className="text-white">Mobile:</span> React Native + AR Core</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-8 text-neon-blue">Equipe Fundadora</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {EQUIPE.map((membro, i) => (
              <div key={i} className="glass rounded-2xl p-6 text-center hover:scale-105 transition border border-zinc-800 hover:border-neon-blue">
                <img src={membro.foto} alt={membro.nome} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-neon-blue" />
                <h3 className="font-bold text-lg">{membro.nome}</h3>
                <p className="text-neon-green text-sm mb-4">{membro.cargo}</p>
                <div className="flex justify-center gap-4 text-xl">
                  <a href={membro.email} target="_blank" rel="noreferrer" className="hover:text-neon-blue transition"><IconMail /></a>
                  <a href={membro.linkedin} target="_blank" rel="noreferrer" className="hover:text-neon-blue transition"><IconLinkedin /></a>
                  <a href={membro.instagram} target="_blank" rel="noreferrer" className="hover:text-neon-blue transition"><IconInstagram /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function Perfil() {
  const [emailEnviado, setEmailEnviado] = useState(false);
  const [mfa2Ativo, setMfa2Ativo] = useState(false);
  const [alertasLogin, setAlertasLogin] = useState(true);
  const [modalSenha, setModalSenha] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaAlterada, setSenhaAlterada] = useState(false);
  const [erroSenha, setErroSenha] = useState("");
  const navigate = useNavigate();

  const reenviarEmail = () => {
    setEmailEnviado(true);
    setTimeout(() => setEmailEnviado(false), 3000);
  };

  const handleAlterarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    setErroSenha("");

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErroSenha("Preencha todos os campos");
      return;
    }
    if (novaSenha.length < 6) {
      setErroSenha("Nova senha deve ter no mínimo 6 caracteres");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem");
      return;
    }
    if (senhaAtual === novaSenha) {
      setErroSenha("A nova senha deve ser diferente da atual");
      return;
    }

    setSenhaAlterada(true);
    setTimeout(() => {
      setModalSenha(false);
      setSenhaAlterada(false);
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      setErroSenha("");
    }, 2000);
  };

  const fecharModalSenha = () => {
    setModalSenha(false);
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmarSenha("");
    setErroSenha("");
    setSenhaAlterada(false);
  };

  const ToggleSwitch = ({ ativo, onToggle, label, desc }: { ativo: boolean, onToggle: () => void, label: string, desc: string }) => (
    <div className="flex items-center justify-between py-4 border-b border-zinc-800 last:border-0">
      <div>
        <p className="font-bold text-white">{label}</p>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-14 h-7 rounded-full transition-colors ${ativo ? 'bg-neon-blue' : 'bg-zinc-700'}`}
      >
        <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${ativo ? 'left-8' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-white pt-28 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-neon-blue hover:underline mb-6 inline-flex items-center gap-2">
          <FiArrowLeft /> Voltar
        </button>
        <h1 className="text-4xl font-bold mb-8">Minha Conta</h1>

        <div className="glass rounded-2xl p-6 mb-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4 text-neon-blue">Dados do Gestor</h2>
          <div className="space-y-2">
            <p><span className="text-gray-400">Nome:</span> Admin ConstructView</p>
            <p><span className="text-gray-400">E-mail:</span> admin@teste.com</p>
            <p><span className="text-gray-400">Plano:</span> <span className="text-neon-green">Premium</span></p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 mb-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-2 text-neon-blue">Segurança</h2>
          <ToggleSwitch
            ativo={mfa2Ativo}
            onToggle={() => setMfa2Ativo(!mfa2Ativo)}
            label="Autenticação 2FA"
            desc={mfa2Ativo ? "Ativado" : "Desativado"}
          />
          <ToggleSwitch
            ativo={alertasLogin}
            onToggle={() => setAlertasLogin(!alertasLogin)}
            label="Alertas de Login"
            desc={alertasLogin ? "Ativado para novos IP" : "Desativado"}
          />
          <button
            onClick={() => setModalSenha(true)}
            className="w-full mt-4 glass border border-zinc-700 hover:border-neon-blue text-white font-bold py-3 px-6 rounded-xl transition"
          >
            Alterar Senha
          </button>
        </div>

        <div className="glass rounded-2xl p-6 mb-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4 text-neon-blue">Últimos Acessos</h2>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-zinc-800 pb-3">
              <div>
                <p className="font-bold">São Paulo, SP</p>
                <p className="text-sm text-gray-400">IP: 192.168.1.1</p>
              </div>
              <p className="text-sm text-gray-400">Hoje, 14:30</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-bold">São Paulo, SP</p>
                <p className="text-sm text-gray-400">IP: 192.168.1.1</p>
              </div>
              <p className="text-sm text-gray-400">Ontem, 09:15</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-zinc-800">
          <h2 className="text-xl font-bold mb-4 text-neon-blue">Verificação de E-mail</h2>
          <p className="text-gray-300 mb-4 text-sm">Para garantir a segurança dos seus investimentos e o recebimento de relatórios PDF, por favor confirme seu endereço de e-mail.</p>
          <button
            onClick={reenviarEmail}
            disabled={emailEnviado}
            className="bg-neon-blue hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-xl transition disabled:opacity-50 flex items-center gap-2"
          >
            {emailEnviado ? <><FiCheck /> E-mail reenviado!</> : <><FiMail /> Reenviar confirmação</>}
          </button>
        </div>
      </div>

      {modalSenha && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={fecharModalSenha}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass rounded-2xl p-8 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {!senhaAlterada ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Alterar Senha</h2>
                <form onSubmit={handleAlterarSenha} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Senha atual</label>
                    <input
                      type="password"
                      value={senhaAtual}
                      onChange={e => setSenhaAtual(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 mt-1 outline-none focus:border-neon-blue"
                      placeholder="Digite sua senha atual"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Nova senha</label>
                    <input
                      type="password"
                      value={novaSenha}
                      onChange={e => setNovaSenha(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 mt-1 outline-none focus:border-neon-blue"
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Confirmar nova senha</label>
                    <input
                      type="password"
                      value={confirmarSenha}
                      onChange={e => setConfirmarSenha(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 mt-1 outline-none focus:border-neon-blue"
                      placeholder="Digite novamente"
                    />
                  </div>
                  {erroSenha && <p className="text-red-500 text-sm">{erroSenha}</p>}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={fecharModalSenha} className="flex-1 glass border border-zinc-700 py-3 rounded-xl hover:bg-zinc-800">Cancelar</button>
                    <button type="submit" className="flex-1 bg-neon-blue text-black font-bold py-3 rounded-xl hover:bg-cyan-400">Salvar</button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="text-3xl text-neon-green" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Senha alterada!</h2>
                <p className="text-gray-300 text-sm">Sua senha foi atualizada com sucesso.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [obraSelecionada, setObraSelecionada] = useState<number | null>(null);
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || "" });
  const kpis = [
    { label: "Valor Total Investido", value: "R$ 42M", tip: "Soma de todo capital aportado nas obras ativas e concluídas nos últimos 24 meses" },
    { label: "ROI Médio", value: "18%", color: "text-neon-green", tip: "Retorno Sobre Investimento. Fórmula: (Lucro / Custo) x 100. Acima de 15% é excelente" },
    { label: "Obras Ativas", value: "12", tip: "Empreendimentos com status 'Em Andamento' que ainda não foram entregues" },
    { label: "Prazo Médio", value: "-3 dias", color: "text-neon-green", tip: "Diferença entre data prevista e real. Negativo = obra adiantada" }
  ];
  const pieData = [{ name: "Residencial", value: 60, fill: "#00D9FF" }, { name: "Comercial", value: 30, fill: "#00FF85" }, { name: "Infra", value: 10, fill: "#A855F7" }];

  const MOCK_OBRAS_MAPA = [
    { id: 1, nome: "Residencial Aurora", lat: -23.53, lng: -46.79, roi: 22 },
    { id: 2, nome: "Parque das Nações", lat: -23.525, lng: -46.77, roi: 8 },
    { id: 3, nome: "Edifício Central", lat: -23.54, lng: -46.80, roi: 18 }
  ];

  const getPinColor = (roi: number) => {
    if (roi > 15) return '#00FF85'; // verde
    if (roi >= 5) return '#FACC15'; // amarelo
    return '#EF4444'; // vermelho
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-4xl font-bold tracking-tight">Visão Geral do Investidor</h1>
            <div className="flex gap-4">
              <button onClick={() => navigate("/perfil")} className="glass px-6 py-2.5 rounded-full hover:bg-zinc-800/80 transition-all font-medium">Minha Conta</button>
              <button onClick={() => navigate("/")} className="glass px-6 py-2.5 rounded-full hover:bg-zinc-800/80 transition-all flex items-center gap-2 text-red-400 hover:text-red-300 font-medium">
                <IconLogOut /> Sair
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-6 border border-zinc-800 hover:border-neon-blue transition">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  {kpi.label}
                  <Tippy content={kpi.tip}><span><IconInfo className="cursor-help" /></span></Tippy>
                </p>
                <p className={`text-3xl font-bold mt-2 ${kpi.color || 'text-white'}`}>{kpi.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-6">Distribuição de Portfólio</h2>
              <div className="w-full h-64">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={5}>
                      {pieData.map((entry, index) => (<Cell key={index} fill={entry.fill} />))}
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <h2 className="text-2xl font-bold mb-6">Mapa de Calor de Investimento</h2>
              <p className="text-sm text-gray-400 mb-4">Verde: ROI &gt;15% | Amarelo: 5-15% | Vermelho: &lt;5%</p>
              <div className="w-full h-64 rounded-xl overflow-hidden">
                {isLoaded ? (
                  <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={center} zoom={13} options={{ styles: darkMapStyle, disableDefaultUI: true }}>
                    {MOCK_OBRAS_MAPA.map(obra => (
                      <MarkerF
                        key={obra.id}
                        position={{ lat: obra.lat, lng: obra.lng }}
                        onClick={() => setObraSelecionada(obra.id)}
                        icon={{ path: 0, scale: 10, fillColor: getPinColor(obra.roi), fillOpacity: 1, strokeWeight: 2, strokeColor: '#FFFFFF' }}
                      >
                        {obraSelecionada === obra.id && (
                          <InfoWindowF onCloseClick={() => setObraSelecionada(null)}>
                            <div className="text-black p-2">
                              <p className="font-bold text-lg">{obra.nome}</p>
                              <p className="text-sm text-gray-700">ROI: <span className="font-bold">{obra.roi}%</span></p>
                              <button onClick={() => navigate(`/obra/${obra.id}`)} className="text-blue-600 font-bold underline text-sm mt-2 hover:text-blue-800 transition">Ver detalhes →</button>
                            </div>
                          </InfoWindowF>
                        )}
                      </MarkerF>
                    ))}
                  </GoogleMap>
                ) : (
                  <div className="w-full h-full bg-zinc-900 rounded-2xl animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@teste.com");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalSenha, setModalSenha] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!email.includes("@")) {
      setErro("Por favor, insira um e-mail válido");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (email === "admin@teste.com") navigate("/dashboard");
      else {
        setErro("Credenciais incorretas");
        setLoading(false);
      }
    }, 1000);
  };

  const handleRecuperarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRecuperacao.includes("@")) return;
    setEnviado(true);
    setTimeout(() => {
      setModalSenha(false);
      setEnviado(false);
      setEmailRecuperacao("");
    }, 2500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
        {/* Animated background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-neon-green/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

        <div className="glass rounded-[3rem] p-10 md:p-14 max-w-md w-full border border-zinc-800/80 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative z-10 backdrop-blur-2xl">
          <Link to="/" className="text-neon-blue hover:text-cyan-400 mb-8 inline-flex items-center gap-2 transition font-medium w-fit group">
            <IconArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Voltar
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-black mb-3 tracking-tight">Construct<span className="text-neon-blue drop-shadow-[0_0_15px_rgba(0,217,255,0.4)]">View</span></h1>
            <p className="text-gray-400 font-medium tracking-wide">Acesso restrito ao Gestor</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-gray-300 mb-2 block">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full bg-black/40 border rounded-2xl p-4 outline-none transition-all placeholder:text-gray-600 ${erro ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-zinc-700/80 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30'}`}
                placeholder="admin@construtora.com"
              />
              {erro && <p className="text-red-500 text-sm mt-2 font-medium flex items-center gap-1"><IconInfo size={16} /> {erro}</p>}
            </div>

            <div>
              <label className="text-sm font-bold text-gray-300 mb-2 block">Senha de Acesso</label>
              <div className="relative">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  className="w-full bg-black/40 border border-zinc-700/80 rounded-2xl p-4 outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all placeholder:text-gray-600"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition p-2 hover:bg-white/5 rounded-full">
                  {mostrarSenha ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-neon-blue hover:bg-cyan-400 text-black font-extrabold text-lg py-4 rounded-2xl transition-all disabled:opacity-50 hover:shadow-[0_0_25px_rgba(0,217,255,0.4)] mt-2">
              {loading ? "Autenticando..." : "Entrar no Painel"}
            </button>

            <div className="flex justify-between text-sm font-medium pt-2">
              <button type="button" onClick={() => setModalSenha(true)} className="text-gray-400 hover:text-neon-blue transition">Esqueci a senha</button>
              <button type="button" onClick={() => navigate("/cadastro")} className="text-gray-400 hover:text-neon-blue transition">Solicitar acesso</button>
            </div>
          </form>
        </div>

        {/* MODAL DE RECUPERAÇÃO */}
        {modalSenha && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass rounded-2xl p-8 max-w-sm w-full">
              {!enviado ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Recuperar senha</h2>
                  <p className="text-gray-300 mb-6 text-sm">Digite seu e-mail cadastrado. Enviaremos um link para redefinir sua senha.</p>
                  <form onSubmit={handleRecuperarSenha}>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      value={emailRecuperacao}
                      onChange={e => setEmailRecuperacao(e.target.value)}
                      required
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 mb-4 outline-none focus:border-neon-blue"
                    />
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setModalSenha(false)} className="flex-1 glass border border-zinc-700 py-3 rounded-xl hover:bg-zinc-800 transition">Cancelar</button>
                      <button type="submit" className="flex-1 bg-neon-blue text-black font-bold py-3 rounded-xl hover:bg-cyan-400 transition">Enviar</button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconMail className="text-3xl text-neon-green" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">E-mail enviado!</h2>
                  <p className="text-gray-300 text-sm">Verifique sua caixa de entrada e spam. O link expira em 15 minutos.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

function CadastroFake() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSucesso(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    }, 1000);
  };

  if (sucesso) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-28 p-4 flex items-center justify-center">
          <div className="glass rounded-[2rem] p-12 text-center border border-neon-green/50 shadow-[0_0_50px_rgba(0,255,133,0.2)] max-w-md w-full">
            <div className="w-20 h-20 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <IconCheck className="text-5xl text-neon-green" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Conta Criada!</h1>
            <p className="text-gray-300">Redirecionando pro Dashboard do investidor...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-28 p-4 flex items-center justify-center relative overflow-hidden">
        {/* Animated background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-neon-green/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

        <div className="glass rounded-[3rem] p-10 md:p-14 max-w-md w-full border border-zinc-800/80 shadow-[0_0_80px_rgba(0,0,0,0.8)] relative z-10 backdrop-blur-2xl">
          <Link to="/login" className="text-neon-blue hover:text-cyan-400 mb-8 inline-flex items-center gap-2 transition font-medium w-fit group">
            <IconArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Voltar
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-black mb-3 tracking-tight">Criar Conta <span className="text-neon-blue drop-shadow-[0_0_15px_rgba(0,217,255,0.4)]">Grátis</span></h1>
            <p className="text-gray-400 font-medium tracking-wide">Junte-se à revolução imobiliária</p>
          </div>

          <form onSubmit={handleCadastro} className="space-y-6">
            <div>
              <label className="text-sm font-bold text-gray-300 mb-2 block">Nome Completo</label>
              <input type="text" placeholder="Seu nome" value={nome} onChange={e => setNome(e.target.value)} required className="w-full bg-black/40 border border-zinc-700/80 rounded-2xl p-4 outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all placeholder:text-gray-600" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-300 mb-2 block">E-mail Corporativo</label>
              <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-black/40 border border-zinc-700/80 rounded-2xl p-4 outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all placeholder:text-gray-600" />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-300 mb-2 block">Senha de Acesso</label>
              <div className="relative">
                <input type={mostrarSenha ? "text" : "password"} placeholder="Crie sua senha" value={senha} onChange={e => setSenha(e.target.value)} required className="w-full bg-black/40 border border-zinc-700/80 rounded-2xl p-4 outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/30 transition-all placeholder:text-gray-600" />
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition p-2 hover:bg-white/5 rounded-full">
                  {mostrarSenha ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-neon-blue hover:bg-cyan-400 text-black font-extrabold text-lg py-4 rounded-2xl transition-all disabled:opacity-50 mt-6 hover:shadow-[0_0_25px_rgba(0,217,255,0.4)]">
              {loading ? "Criando conta..." : "Começar a Investir"}
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-8xl font-black text-neon-blue mb-4 drop-shadow-[0_0_20px_rgba(0,217,255,0.5)]">404</h1>
        <p className="text-2xl font-bold mb-8">Página não encontrada</p>
        <Link to="/" className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-full transition-all">← Voltar ao Início</Link>
      </div>
    </PageTransition>
  );
}

function App() {
  return (
    <div className="bg-dark-bg min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<CadastroFake />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/demo" element={<Dashboard />} />
          <Route path="*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/obras" element={<ListaObras />} />
                <Route path="/obra/:id" element={<ObraDetalhe />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function QrCard({ obraId }: { obraId: number }) {
  const urlObra = `https://constructview.vercel.app/obra/${obraId}`;

  const handleDownloadApp = () => {
    window.open("/app-release.apk", "_blank");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-3xl p-6 md:p-8 border border-zinc-800 hover:border-neon-blue transition-all shadow-xl"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h3 className="text-2xl font-extrabold mb-3">Obras na palma da mão</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">Baixe o app oficial para visualizar modelos 3D das obras diretamente no local com Realidade Aumentada.</p>
          <button
            onClick={handleDownloadApp}
            className="bg-neon-blue hover:bg-cyan-400 text-black font-bold py-4 px-8 rounded-full transition-all flex items-center gap-3 hover:shadow-[0_0_20px_rgba(0,217,255,0.4)]"
          >
            <IconDownload size={20} /> Baixar App Mobile
          </button>
        </div>

        <div className="glass rounded-xl p-4 border border-zinc-700">
          <p className="text-sm text-gray-400 mb-2 text-center">QR Code do Tapume</p>
          <div className="bg-white rounded-lg overflow-hidden flex items-center justify-center" style={{ width: 128, height: 128, margin: "0 auto" }}>
            <QRCodeSVG
              value={urlObra}
              size={128}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="H"
              includeMargin={true}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Escaneie para abrir</p>
        </div>
      </div>
    </motion.div>
  );
}

export default App;