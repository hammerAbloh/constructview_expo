import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);

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
        
        {/* Desktop Nav */}
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

        <div className="hidden md:block">
          {token ? (
            <button onClick={handleLogout} className="bg-cv-blue/10 text-cv-blue px-5 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-cv-blue/20 transition">
              Sair
            </button>
          ) : (
            <Link to="/gestor" className="bg-cv-blue text-cv-dark px-5 py-2 rounded-full font-semibold flex items-center gap-2 shadow-glow-blue hover:scale-105 transition">
              {(FiArrowRight as any)({})} Portal do Gestor
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-2xl text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (FiX as any)({}) : (FiMenu as any)({})}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-cv-dark border-t border-white/5 flex flex-col items-center py-6 gap-6 font-medium absolute w-full shadow-lg">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-cv-blue transition">Home</Link>
          <Link to="/obras" onClick={() => setMenuOpen(false)} className="hover:text-cv-blue transition">Obras</Link>
          <Link to="/sobre" onClick={() => setMenuOpen(false)} className="hover:text-cv-blue transition">Sobre</Link>
          {token ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-cv-blue transition">Painel Gestor</Link>
              <Link to="/perfil" onClick={() => setMenuOpen(false)} className="hover:text-cv-blue transition">Meu Perfil</Link>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="mt-4 bg-cv-blue/10 text-cv-blue px-8 py-3 rounded-full font-semibold hover:bg-cv-blue/20 transition w-3/4">
                Sair
              </button>
            </>
          ) : (
            <Link to="/gestor" onClick={() => setMenuOpen(false)} className="mt-4 bg-cv-blue text-cv-dark px-8 py-3 rounded-full font-semibold shadow-glow-blue w-3/4 text-center">
              Portal do Gestor
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
