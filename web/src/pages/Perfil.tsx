// src/pages/Perfil.tsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Perfil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [obras, setObras] = useState<any[]>([]);

  useEffect(() => {
    if (user?.role === 'CONSTRUTORA' || user?.role === 'CLIENTE') {
      api.getObras().then(data => {
        setObras(Array.isArray(data) ? data : []);
      }).catch(() => setObras([]));
    }
  }, [user]);

  if (!user) return <div className="p-6 text-center pt-24 min-h-screen">Carregando...</div>;

  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
        <div className="bg-bg-card rounded-lg p-6 border border-gray-800 mb-6">
          <button onClick={() => navigate(-1)} className="text-cv-blue flex items-center gap-2 text-sm hover:underline mb-4">
            {(FiArrowLeft as any)({})} Voltar
          </button>
          <h1 className="text-3xl font-bold text-accent mb-2">Meu Perfil</h1>
          <p className="text-lg">Nome: <span className="font-bold">{user.nome}</span></p>
          <p className="text-lg">Email: <span className="font-bold">{user.email}</span></p>
          <p className="text-lg">Role: <span className="font-bold text-accent">{user.role}</span></p>

          {user.role === 'ADMIN' && (
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h2 className="text-xl font-bold text-accent mb-2 flex items-center gap-2">
                🛠️ Ferramentas Administrativas
              </h2>
              <p className="text-gray-400 text-sm mb-4">
                Gere códigos de convite seguros para cadastrar novas Construtoras. Ao utilizarem o código, as construtoras criam sua própria Obra automaticamente.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/admin/codigo" className="bg-gradient-to-r from-cv-blue to-cyan-500 text-cv-dark px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform inline-block shadow-glow-blue text-center">
                  Gerar Novo Código de Convite
                </Link>
                <Link to="/admin/usuarios" className="bg-cv-dark border border-cv-blue text-cv-blue px-6 py-3 rounded-lg font-bold hover:bg-cv-blue/10 transition-colors inline-block text-center">
                  Ver Acessos de Clientes e Usuários
                </Link>
              </div>
            </div>
          )}
        </div>

        {(user.role === 'CONSTRUTORA' || user.role === 'CLIENTE') && (
          <div>
            <h2 className="text-2xl font-bold text-accent mb-2">
              {user.role === 'CONSTRUTORA' ? 'Suas Obras' : 'Obras Acompanhadas / Investidas'}
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              {user.role === 'CONSTRUTORA' 
                ? 'Acompanhe as obras criadas e sob a gestão da sua construtora.' 
                : 'Obras que você favoritou ou está acompanhando o progresso e retorno.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {obras.slice(0, 3).map(obra => (
                <div key={obra.id} className="bg-bg-card rounded-lg p-5 border border-gray-800 card-glow transition-all hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-white mb-1">{obra.nome}</h3>
                  <p className="text-sm text-gray-400 mb-4">Status: <span className="text-cv-blue font-semibold">{obra.status}</span></p>
                  <Link to={`/obras/${obra.id}`} className="bg-cv-blue/10 text-cv-blue px-4 py-2 rounded font-semibold inline-block text-sm hover:bg-cv-blue hover:text-cv-dark transition-colors">
                    Acessar Painel da Obra
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
