// src/pages/AdminCodigo.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { api } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Codigo = {
  id: number;
  codigo: string;
  nomeConstrutora: string;
  usado: boolean;
  emailUsado: string | null;
  criadoEm: string;
};

export default function AdminCodigo() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [codigos, setCodigos] = useState<Codigo[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarCodigos = async () => {
    try {
      const res = await fetch('`process.env.REACT_APP_API_URL || "http://localhost:8080"`/api/admin/codigos', {
        headers: { 'Authorization': `Bearer ${api.getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setCodigos(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    carregarCodigos();
  }, []);

  const gerar = async () => {
    if (!nome.trim()) {
      alert("Digite o nome da construtora");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('`process.env.REACT_APP_API_URL || "http://localhost:8080"`/api/admin/gerar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${api.getToken()}` },
        body: JSON.stringify({ nomeConstrutora: nome })
      });
      if (!res.ok) throw new Error('Erro ao gerar código');
      await carregarCodigos(); // Atualiza a lista
      setNome('');
    } catch (e) {
      alert('Erro ao gerar código');
    } finally {
      setLoading(false);
    }
  };

  const copiar = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    alert('Código copiado para a área de transferência!');
  };

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <button onClick={() => navigate(-1)} className="text-cv-blue flex items-center gap-2 text-sm hover:underline mb-4">
          {(FiArrowLeft as any)({})} Voltar
        </button>
        <h1 className="text-3xl font-bold text-accent mb-6 text-glow">Gerenciar Códigos de Convite</h1>
        
        <div className="bg-bg-card p-6 rounded-lg border border-gray-800 card-glow mb-8 flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-gray-400 mb-2 text-sm">Nome da Construtora</label>
            <input 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              placeholder="Ex: Cyrela, MRV, etc." 
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700 focus:border-accent focus:outline-none transition-colors" 
            />
          </div>
          <button 
            onClick={gerar} 
            disabled={loading}
            className="bg-accent text-white px-6 py-3 rounded font-bold hover:bg-cyan-600 transition-colors h-[50px] whitespace-nowrap disabled:opacity-50"
          >
            {loading ? 'Gerando...' : 'Gerar Código'}
          </button>
        </div>

        <div className="bg-bg-card rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-800">
                <th className="p-4 font-bold text-accent">Código</th>
                <th className="p-4 font-bold text-accent">Construtora</th>
                <th className="p-4 font-bold text-accent">Status</th>
                <th className="p-4 font-bold text-accent text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {codigos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">Nenhum código gerado ainda.</td>
                </tr>
              ) : (
                codigos.map((c) => (
                  <tr key={c.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 font-mono text-white">{c.codigo}</td>
                    <td className="p-4 text-gray-300">{c.nomeConstrutora}</td>
                    <td className="p-4">
                      {c.usado ? (
                        <span className="bg-red-900/40 text-red-400 px-3 py-1 rounded-full text-xs border border-red-900/60 font-bold">
                          USADO por {c.emailUsado}
                        </span>
                      ) : (
                        <span className="bg-green-900/40 text-green-400 px-3 py-1 rounded-full text-xs border border-green-900/60 font-bold">
                          DISPONÍVEL
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => copiar(c.codigo)}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Copiar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
