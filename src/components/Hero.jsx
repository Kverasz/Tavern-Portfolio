import { ArrowDown, Terminal } from 'lucide-react';

export default function Hero({ tema }) {
  return (
    <section className="py-20 flex flex-col items-start justify-center min-h-[75vh]">
      {/* Badge de status */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6 border ${
        tema === 'noite'
          ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          : 'bg-amber-800/10 border-amber-800/20 text-amber-900'
      }`}>
        <Terminal className="w-3.5 h-3.5" />
        <span>Desenvolvedor Full Stack</span>
      </div>

      {/* Título Principal */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight mb-6">
        Moldando código com a precisão de um <span className="text-amber-500 underline decoration-amber-500/40 underline-offset-8">Ferreiro</span> e a mente de um <span className="text-amber-500 underline decoration-amber-500/40 underline-offset-8">Estrategista</span>.
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <img 
            src="/Tavern.png" 
            alt="Taverna de Kennedy" 
            className="w-80 h-80 mr-auto mt-4 object-contain hover:scale-130 transition-transform" 
            />

        {/* Subtítulo */}
        <p className="text-xl sm:text-2xl opacity-85 leading-relaxed">
            Bem-vindo à minha taverna digital. Aqui compartilho meus projetos, 
            integrações backend em Python e soluções de automação.
        </p>

      </div>



      {/* Botões de Ação */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        <a
        href="#sobre"
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            tema === 'noite'
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900 text-amber-50 hover:bg-slate-800 shadow-lg shadow-slate-900/10'
        }`}
       
        >
        Sobre Mim
        <ArrowDown className="w-4 h-4" />
        </a>

        <a
          href="#projetos"
          className={`px-6 py-3 rounded-lg font-semibold border transition-all duration-300 ${
            tema === 'noite'
            ? 'border-amber-400/30 hover:bg-amber-400/10 text-amber-100'
            : 'border-slate-800/30 hover:bg-slate-900/10 text-slate-900'
          }`}
        >
          Ver Projetos
          
        </a>

                <a
          href="#avaliacoes"
          className={`px-6 py-3 rounded-lg font-semibold border transition-all duration-300 ${
            tema === 'noite'
              ? 'border-amber-400/30 hover:bg-amber-400/10 text-amber-100'
              : 'border-slate-800/30 hover:bg-slate-900/10 text-slate-900'
          }`}
        >
          Venha Avaliar!
        </a>

        <a
          href="#contato"
          className={`px-6 py-3 rounded-lg font-semibold border transition-all duration-300 ${
            tema === 'noite'
              ? 'border-amber-400/30 hover:bg-amber-400/10 text-amber-100'
              : 'border-slate-800/30 hover:bg-slate-900/10 text-slate-900'
          }`}
        >
          Falar Comigo
        </a>
      </div>

      {/* Links Sociais com SVG nativo */}
      <div className="flex items-center gap-4 opacity-75">
        <a 
          href="https://github.com/Kverasz" 
          target="_blank" 
          rel="noreferrer"
          className="hover:opacity-100 hover:scale-110 transition-transform p-2"
          aria-label="GitHub"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a 
          href="https://www.linkedin.com/in/kennedy-de-lima-veras-48366b2b4/" 
          target="_blank" 
          rel="noreferrer"
          className="hover:opacity-100 hover:scale-110 transition-transform p-2"
          aria-label="LinkedIn"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.262-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>
    </section>
  );
}