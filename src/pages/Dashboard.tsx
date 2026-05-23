import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiTrendingUp, FiMapPin, FiBarChart2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const username = "Gestor";

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full mt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bem-vindo, {username}</h1>
          <Link to="/obras" className="bg-cv-blue text-cv-dark px-6 py-2 rounded-full font-bold shadow-glow-blue hover:scale-105 transition">
            Ver Obras
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card p-6 border-t-4 border-cv-blue hover:scale-105 transition duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-300">ROI Médio</h3>
              {(FiTrendingUp as any)({ className: "text-cv-blue text-2xl" })}
            </div>
            <p className="text-4xl font-bold text-white">18.5%</p>
            <p className="text-sm text-cv-green mt-2">+2.4% este mês</p>
          </div>
          
          <div className="glass-card p-6 border-t-4 border-cv-green hover:scale-105 transition duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-300">Melhor Região</h3>
              {(FiMapPin as any)({ className: "text-cv-green text-2xl" })}
            </div>
            <p className="text-2xl font-bold text-white">Osasco - Centro</p>
            <p className="text-sm text-gray-400 mt-2">Maior valorização projetada</p>
          </div>
          
          <div className="glass-card p-6 border-t-4 border-purple-500 hover:scale-105 transition duration-300 cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-300">Obras Ativas</h3>
              {(FiBarChart2 as any)({ className: "text-purple-500 text-2xl" })}
            </div>
            <p className="text-4xl font-bold text-white">3</p>
            <p className="text-sm text-gray-400 mt-2">2 em andamento, 1 concluída</p>
          </div>
        </div>

        <div className="glass-card p-8 shadow-glow-blue">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            {(FiTrendingUp as any)({ className: "text-cv-blue" })} Melhores Investimentos da Região
          </h2>
          <div className="space-y-4">
            <div className="bg-cv-dark/50 border border-white/10 p-4 rounded-lg flex justify-between items-center hover:bg-white/5 transition">
              <div>
                <h4 className="font-semibold text-lg text-white">Residencial Aurora</h4>
                <p className="text-sm text-gray-400 mt-1">Risco: Baixo (No Prazo) • ROI Estimado: 22%</p>
              </div>
              <Link to="/obras/1" className="bg-cv-green/20 text-cv-green px-4 py-2 rounded-full text-sm font-bold hover:bg-cv-green/30 transition">Excelente Opção</Link>
            </div>
            <div className="bg-cv-dark/50 border border-white/10 p-4 rounded-lg flex justify-between items-center hover:bg-white/5 transition">
              <div>
                <h4 className="font-semibold text-lg text-white">Edifício Central</h4>
                <p className="text-sm text-gray-400 mt-1">Risco: Baixo (Concluída) • ROI Estimado: 18%</p>
              </div>
              <Link to="/obras/3" className="bg-cv-blue/20 text-cv-blue px-4 py-2 rounded-full text-sm font-bold hover:bg-cv-blue/30 transition">Opção Segura</Link>
            </div>
            <div className="bg-cv-dark/50 border border-white/10 p-4 rounded-lg flex justify-between items-center hover:bg-white/5 transition">
              <div>
                <h4 className="font-semibold text-lg text-white">Parque das Nações</h4>
                <p className="text-sm text-gray-400 mt-1">Risco: Alto (Atrasada) • ROI Estimado: 8%</p>
              </div>
              <Link to="/obras/2" className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold hover:bg-red-500/30 transition">Atenção</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
