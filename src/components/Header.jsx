import { Tent, Ship } from 'lucide-react';

export default function Header({ tema, setTema }) {
  return (
    <header className="flex justify-between items-center py-6 border-b border-current/10">
      {/* Logotipo / Ícone PNG + Nome */}
      <div className="flex items-center gap-3">
        <img 
          src="/image.png" 
          alt="Logo Kennedy" 
          className="w-20 h-20 object-contain hover:scale-130 transition-transform" 
        />
        <span className="text-xl font-bold tracking-wider uppercase">
          Kennedy<span className="text-amber-500">.dev</span>
        </span>
      </div>

      {/* Links de Navegação */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold opacity-80">

        <a href="#sobre" className="hover:text-amber-500 transition-colors">
          Sobre Mim
        </a>

        <a href="#projetos" className="hover:text-amber-500 transition-colors">
          Projetos
        </a>

        <a href="#avaliacoes" className="hover:text-amber-500 transition-colors">
        Mural
        </a>
        
        <a href="#contato" className="hover:text-amber-500 transition-colors">
          Contato
        </a>
      </nav>

      {/* Botão de Troca de Tema */}
      <button
        onClick={() => setTema(tema === 'dia' ? 'noite' : 'dia')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 cursor-pointer ${
          tema === 'noite'
            ? 'border-amber-400/30 bg-slate-900/60 text-amber-100 hover:bg-slate-800'
            : 'border-slate-800/20 bg-amber-100/70 text-slate-900 hover:bg-amber-200/80'
        }`}
        aria-label="Alternar tema"
      >
        {tema === 'dia' ? (
          <>
            <Ship className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-medium">Modo Dia</span>
          </>
        ) : (
          <>
            <Tent className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-medium">Modo Noite</span>
          </>
        )}
      </button>
    </header>
  );
}