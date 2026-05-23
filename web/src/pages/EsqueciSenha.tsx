import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Preencha o e-mail');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
      toast.success('Link enviado para o seu e-mail!');
      setEmail('');
    } catch (err) {
      toast.error('Erro ao enviar link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster />
      <div className="glass-card w-full max-w-md p-8 shadow-glow-blue">
        <Link to="/login" className="text-cv-blue flex items-center gap-2 text-sm mb-6">
          {(FiArrowLeft as any)({})} Voltar
        </Link>
        <h1 className="text-2xl font-bold text-center">Recuperar Senha</h1>
        <p className="text-center text-gray-400 text-sm mt-2 mb-6">
          Enviaremos um link de recuperação para o seu e-mail.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold">E-mail Corporativo</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full bg-cv-gray mt-2 p-3 rounded-lg outline-none focus:ring-2 ring-cv-blue" 
              placeholder="exemplo@construtora.com"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cv-blue text-cv-dark py-3 rounded-lg font-bold shadow-glow-blue hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar Link'}
          </button>
        </form>
      </div>
    </div>
  );
}
