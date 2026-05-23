export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold">Construct<span className="text-cv-blue">View</span></h3>
          <p className="text-sm text-gray-400 mt-2">Transparência em cada tijolo. Do QR ao AR.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">PRODUTO</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li><a href="/obras" className="hover:text-cv-blue">Ver Demo</a></li>
            <li><a href="#" className="hover:text-cv-blue">Baixar App Android</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">TCC 2026</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>Engenharia de Software</li>
            <li>Faculdade Expo</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-6 border-t border-white/5">
        © 2026 ConstructView. Escaneie o QR. Construa o futuro.
      </div>
    </footer>
  );
}
