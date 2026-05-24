import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { api } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

type Usuario = {
  id: number;
  nome: string;
  email: string;
  role: string;
};

export default function AdminUsuarios() {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  const carregarUsuarios = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/api/admin/usuarios`, {
        headers: { 'Authorization': `Bearer ${api.getToken()}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-5xl mx-auto w-full">
        <button onClick={() => navigate(-1)} className="text-cv-blue flex items-center gap-2 text-sm hover:underline mb-4">
          {(FiArrowLeft as any)({})} Voltar
        </button>
        <h1 className="text-3xl font-bold text-accent mb-6 text-glow">Controle de Acessos (Usuários)</h1>

        {loading ? (
          <p className="text-gray-400">Carregando usuários...</p>
        ) : (
          <div className="bg-bg-card rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-900 border-b border-gray-800">
                  <th className="p-4 font-bold text-accent">ID</th>
                  <th className="p-4 font-bold text-accent">Nome</th>
                  <th className="p-4 font-bold text-accent">Email</th>
                  <th className="p-4 font-bold text-accent">Nível de Acesso (Role)</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">Nenhum usuário encontrado.</td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                      <td className="p-4 text-gray-400">{u.id}</td>
                      <td className="p-4 font-bold text-white">{u.nome}</td>
                      <td className="p-4 text-gray-300">{u.email}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          u.role === 'ADMIN' ? 'bg-purple-900/40 text-purple-400 border border-purple-900/60' :
                          u.role === 'CONSTRUTORA' ? 'bg-orange-900/40 text-orange-400 border border-orange-900/60' :
                          'bg-blue-900/40 text-blue-400 border border-blue-900/60'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
