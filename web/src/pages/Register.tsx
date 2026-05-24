import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
  const [isConstrutora, setIsConstrutora] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [codigo, setCodigo] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const validarCodigo = async () => {
    if (!codigo) return toast.error('Digite o código');
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/api/auth/validar-codigo`, { codigo });
      setNome(res.data.nomeConstrutora);
      toast.success('Código válido!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Código inválido');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const role = isConstrutora ? 'CONSTRUTORA' : 'CLIENTE';
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:8080"}/api/auth/register`, { nome, email, senha, role, codigoConvite: codigo });
      toast.success('Conta criada! Faça login.');
      navigate('/gestor');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erro ao criar conta');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Toaster />
      <div className="glass-card w-full max-w-md p-8 shadow-glow-blue">
        <button type="button" onClick={() => navigate(-1)} className="text-cv-blue flex items-center gap-2 text-sm hover:underline">{(FiArrowLeft as any)({})} Voltar</button>
        <h1 className="text-3xl font-bold text-center mt-4">Criar Conta <span className="text-cv-blue">Grátis</span></h1>
        <p className="text-center text-gray-400 text-sm">Junte-se à revolução imobiliária</p>

        <div className="flex gap-2 bg-cv-gray p-1 rounded-full mt-6">
          <button onClick={() => setIsConstrutora(false)} className={`flex-1 py-2 rounded-full text-sm font-semibold ${!isConstrutora? 'bg-cv-blue text-cv-dark' : ''}`}>Investidor</button>
          <button onClick={() => setIsConstrutora(true)} className={`flex-1 py-2 rounded-full text-sm font-semibold ${isConstrutora? 'bg-cv-blue text-cv-dark' : ''}`}>Sou uma Construtora</button>
        </div>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          {isConstrutora && (
            <div>
              <label className="text-sm font-semibold">Código de Convite</label>
              <div className="flex gap-2">
                <input value={codigo} onChange={e => setCodigo(e.target.value)} className="flex-1 bg-cv-gray mt-1 p-3 rounded-lg outline-none focus:ring-2 ring-cv-blue" />
                <button type="button" onClick={validarCodigo} className="bg-cv-gray mt-1 px-4 rounded-lg text-sm">Validar</button>
              </div>
            </div>
          )}
          <div>
            <label className="text-sm font-semibold">{isConstrutora? 'Nome da Construtora' : 'Nome Completo'}</label>
            <input value={nome} onChange={e => setNome(e.target.value)} disabled={isConstrutora} className="w-full bg-cv-gray mt-1 p-3 rounded-lg outline-none focus:ring-2 ring-cv-blue disabled:opacity-70" />
          </div>
          <div>
            <label className="text-sm font-semibold">E-mail Corporativo</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-cv-gray mt-1 p-3 rounded-lg outline-none focus:ring-2 ring-cv-blue" />
          </div>
          <div>
            <label className="text-sm font-semibold">Senha de Acesso</label>
            <div className="relative">
              <input type={show? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)} className="w-full bg-cv-gray mt-1 p-3 rounded-lg outline-none focus:ring-2 ring-cv-blue" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-4 text-gray-400">{show? (FiEyeOff as any)({}) : (FiEye as any)({})}</button>
            </div>
          </div>
          <button type="submit" className="w-full bg-cv-blue text-cv-dark py-3 rounded-lg font-bold shadow-glow-blue hover:scale-105 transition">Começar a Investir</button>
        </form>
      </div>
    </div>
  );
}
