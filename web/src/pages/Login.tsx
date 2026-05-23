import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('admin@teste.com');
  const [senha, setSenha] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, senha });
      toast.success('Bem-vindo!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Erro ao logar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster />
      <div className="glass-card w-full max-w-md p-8 shadow-glow-blue">
        <Link to="/" className="text-cv-blue flex items-center gap-2 text-sm">{(FiArrowLeft as any)({})} Voltar</Link>
        <h1 className="text-3xl font-bold text-center mt-4">Construct<span className="text-cv-blue">View</span></h1>
        <p className="text-center text-gray-400 text-sm">Acesso restrito ao Gestor</p>
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-semibold">E-mail Corporativo</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-cv-gray mt-2 p-3 rounded-lg outline-none focus:ring-2 ring-cv-blue" />
          </div>
          <div>
            <label className="text-sm font-semibold">Senha de Acesso</label>
            <div className="relative">
              <input type={show? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} className="w-full bg-cv-gray mt-2 p-3 rounded-lg outline-none focus:ring-2 ring-cv-blue" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-5 text-gray-400">{show? (FiEyeOff as any)({}) : (FiEye as any)({})}</button>
            </div>
          </div>
          <button type="submit" className="w-full bg-cv-blue text-cv-dark py-3 rounded-lg font-bold shadow-glow-blue hover:scale-105 transition">Entrar no Painel</button>
          <div className="flex justify-between text-xs text-gray-400">
            <Link to="/esqueci-senha" className="hover:text-cv-blue">Esqueci a senha</Link>
            <Link to="/register" className="hover:text-cv-blue">Solicitar acesso</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
