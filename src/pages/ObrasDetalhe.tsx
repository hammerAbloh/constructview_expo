import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { FiArrowLeft, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface Obra {
  id: number;
  nome: string;
  progresso: number;
  construtora: string;
  status: string;
  risco: string;
  roi: number;
  fotos: string[];
  evolucao: string;
}

export default function ObrasDetalhe() {
  const { id } = useParams();
  const [obra, setObra] = useState<Obra | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const res = await axios.get(``process.env.REACT_APP_API_URL || "http://localhost:8080"`/api/obras/${id}`);
        setObra(res.data);
      } catch (err) {
        console.error('Erro ao buscar obra', err);
      } finally {
        setLoading(false);
      }
    };
    fetchObra();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Header />
        <div className="w-16 h-16 border-4 border-cv-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!obra) {
    return (
      <div className="min-h-screen pt-24 flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Obra não encontrada</h1>
          <Link to="/obras" className="text-cv-blue hover:underline">Voltar para Obras</Link>
        </main>
        <Footer />
      </div>
    );
  }

  let evolucaoData = [];
  try {
    evolucaoData = obra.evolucao ? (typeof obra.evolucao === 'string' ? JSON.parse(obra.evolucao) : obra.evolucao) : [];
    if (!Array.isArray(evolucaoData)) evolucaoData = [];
  } catch (e) {
    console.error('Erro ao fazer parse da evolução', e);
    evolucaoData = [];
  }

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-6 w-full mt-4">
        <Link to="/obras" className="text-cv-blue flex items-center gap-2 mb-6 w-fit">
          {(FiArrowLeft as any)({})} Voltar para Obras
        </Link>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-bold">{obra.nome}</h1>
            <p className="text-gray-400">Responsável: {obra.construtora}</p>
            
            {obra.fotos && obra.fotos.length > 0 ? (
              <img src={obra.fotos[0]} alt={obra.nome} className="w-full h-[400px] object-cover rounded-2xl shadow-lg border border-white/10" />
            ) : (
              <div className="w-full h-[400px] bg-cv-gray rounded-2xl flex items-center justify-center text-gray-500">
                Sem imagem disponível
              </div>
            )}
            
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4">Progresso Geral</h3>
              <div className="flex justify-between items-end mb-2">
                <span className="text-3xl font-bold text-cv-green">{obra.progresso}%</span>
                <span className="text-sm text-gray-400">Status: {obra.status}</span>
              </div>
              <div className="w-full bg-cv-dark rounded-full h-3">
                <div className="bg-cv-green h-3 rounded-full transition-all duration-1000" style={{ width: `${obra.progresso}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass-card p-6 shadow-glow-blue border-t-4 border-cv-blue">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                {(FiTrendingUp as any)({ className: "text-cv-blue" })} Análise de Investimento
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">ROI Projetado</p>
                  <p className="text-3xl font-bold text-white">{obra.roi}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Nível de Risco</p>
                  <div className="flex items-center gap-2 mt-1">
                    {(FiAlertCircle as any)({ className: obra.risco === 'Atrasada' ? 'text-red-500' : 'text-cv-green' })}
                    <span className={`font-semibold ${obra.risco === 'Atrasada' ? 'text-red-500' : 'text-cv-green'}`}>
                      {obra.risco}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-6 bg-cv-blue text-cv-dark py-3 rounded-lg font-bold hover:scale-105 transition">
                Baixar Relatório Completo
              </button>
            </div>
            
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-4">Evolução Mensal</h3>
              <div className="h-48 w-full bg-cv-dark rounded-lg p-2">
                {evolucaoData && evolucaoData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={evolucaoData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorProgresso" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#00D1FF" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="mes" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#00D1FF', fontWeight: 'bold' }}
                        formatter={(value: any) => [`${value}%`, 'Progresso']}
                      />
                      <Area type="monotone" dataKey="progresso" stroke="#00D1FF" strokeWidth={3} fillOpacity={1} fill="url(#colorProgresso)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                    Nenhum dado de evolução disponível.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
