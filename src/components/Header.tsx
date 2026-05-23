import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-cv-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Construct<span className="text-cv-blue">View</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-cv-blue transition">Home</Link>
          <Link to="/obras" className="hover:text-cv-blue transition">Obras</Link>
          <Link to="/sobre" className="hover:text-cv-blue transition">Sobre</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-cv-blue transition">Painel Gestor</Link>
              <Link to="/perfil" className="hover:text-cv-blue transition">Meu Perfil</Link>
            </>
          ) : (
            <Link to="/gestor" className="hover:text-cv-blue transition">Minha Conta</Link>
          )}
        </nav>
        {token? (
          <button onClick={handleLogout} className="bg-cv-blue/10 text-cv-blue px-5 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-cv-blue/20 transition">
            Sair
          </button>
        ) : (
          <Link to="/gestor" className="bg-cv-blue text-cv-dark px-5 py-2 rounded-full font-semibold flex items-center gap-2 shadow-glow-blue hover:scale-105 transition">
            {(FiArrowRight as any)({})} Portal do Gestor
          </Link>
        )}
      </div>
    </header>
  );
}
