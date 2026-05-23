import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="pt-24 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        {(FiAlertTriangle as any)({ className: "text-cv-blue text-6xl mb-4" })}
        <h1 className="text-4xl font-bold mb-4">404 - Página Não Encontrada</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link to="/" className="bg-cv-blue text-cv-dark px-6 py-3 rounded-full font-bold shadow-glow-blue hover:scale-105 transition">
          Voltar para Home
        </Link>
      </main>
      <Footer />
    </div>
  );
}
