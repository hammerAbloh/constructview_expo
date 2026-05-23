import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiMail, FiInstagram, FiLinkedin } from 'react-icons/fi';

const equipe = [
  {
    nome: 'Lucas Pinheiro de Souza',
    cargo: 'Desenvolvedor Full Stack',
    img: '/team/lucas.png',
    email: 'mailto:xlucasx.pds@gmail.com',
    linkedin: 'https://www.linkedin.com/in/lucas-pinheiro-souza/',
    insta: 'https://instagram.com/xlucasx.pds'
  },
  {
    nome: 'Giovanna Braz Ghermacovski',
    cargo: 'Desenvolvedora Mobile',
    img: '/team/giovanna.png',
    email: 'mailto:gibraz.2006@gmail.com',
    linkedin: 'https://www.linkedin.com/in/giovanna-braz-ghermacovski-7567682b7/',
    insta: 'https://instagram.com/gibrazxw_'
  },
  {
    nome: 'Anne Marie Lambert',
    cargo: 'Frontend Developer',
    img: '/team/anne.png',
    email: 'mailto:annemlambert82@gmail.com',
    linkedin: 'https://www.linkedin.com/in/anne-marie-lambert-9a4771264/',
    insta: 'https://instagram.com/amarie_dx'
  },
  {
    nome: 'Guilherme Ferreira de Sousa',
    cargo: 'Database Architect',
    img: '/team/guilherme.png',
    email: 'mailto:guilfs06@gmail.com',
    linkedin: 'https://www.linkedin.com/in/guilherme-ferreira-72798630a/',
    insta: 'https://instagram.com/gferre.ira'
  },
];

export default function Sobre() {
  return (
    <div className="pt-24">
      <Header />
      <main className="max-w-7xl mx-auto px-6">
        <div className="glass-card p-8 md:p-12">
          <h1 className="text-4xl font-bold">Sobre o Construct<span className="text-cv-blue">View</span></h1>
          <p className="text-gray-400 mt-4 max-w-3xl">
            Plataforma de transparência em obras públicas e privadas usando QR Code, Realidade Aumentada e dados abertos.
          </p>

          <h2 className="text-cv-blue text-2xl font-bold mt-10">Por que ConstructView?</h2>
          <p className="text-gray-300 mt-3 max-w-4xl">
            O mercado de construção civil movimenta R$ 2.1 trilhões no Brasil, mas 67% dos investidores não têm acesso a dados em tempo real. 
            Atrasos custam em média 23% do orçamento. Nossa plataforma resolve isso com QR Codes nos tapumes, RA para visualização 3D 
            e dashboards que traduzem dados técnicos em ROI claro.
          </p>

          <h2 className="text-cv-blue text-2xl font-bold mt-10">Stack Técnica</h2>
          <ul className="list-disc list-inside text-gray-300 mt-3 space-y-1">
            <li>Frontend: React + TypeScript + TailwindCSS + React Router</li>
            <li>Backend: Java Spring Boot + PostgreSQL + JWT</li>
            <li>APIs: Google Maps, QR Code, React Hot Toast</li>
            <li>Mobile: React Native + AR Core</li>
          </ul>

          <h2 className="text-cv-blue text-2xl font-bold mt-10">Equipe Fundadora</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {equipe.map(p => (
              <div key={p.nome} className="glass-card p-6 text-center hover:scale-105 transition duration-300">
                <img 
                  src={p.img} 
                  alt={p.nome} 
                  className="w-24 h-24 rounded-full mx-auto border-2 border-cv-blue object-cover shadow-glow-blue"
                  onError={(e) => e.currentTarget.src = 'https://i.imgur.com/8Km9tLL.png'} // Fallback se não achar a foto
                />
                <h3 className="font-bold mt-4 text-white">{p.nome}</h3>
                <p className="text-cv-green text-sm font-semibold">{p.cargo}</p>
                <div className="flex justify-center gap-4 mt-4 text-xl text-gray-400">
                  <a 
                    href={p.email} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-cv-blue transition"
                    aria-label={`Email de ${p.nome}`}
                  >
                    {(FiMail as any)({})}
                  </a>
                  <a 
                    href={p.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-cv-blue transition"
                    aria-label={`LinkedIn de ${p.nome}`}
                  >
                    {(FiLinkedin as any)({})}
                  </a>
                  <a 
                    href={p.insta} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-cv-blue transition"
                    aria-label={`Instagram de ${p.nome}`}
                  >
                    {(FiInstagram as any)({})}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
