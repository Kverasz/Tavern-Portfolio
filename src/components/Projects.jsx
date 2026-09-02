import { useState, useEffect } from 'react';
import { ExternalLink, Code2, FolderGit2, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Projects({ tema }) {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [indexAtual, setIndexAtual] = useState(0);

  useEffect(() => {
    fetch('https://tavern-portfolio.onrender.com/api/projetos')
      .then((res) => res.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setProjetos(dados);
        }
        setCarregando(false);
      })
      .catch((erro) => {
        console.error('Erro ao buscar projetos:', erro);
        setCarregando(false);
      });
  }, []);

  const proximoProjeto = () => {
    setIndexAtual((prev) => (prev === projetos.length - 1 ? 0 : prev + 1));
  };

  const projetoAnterior = () => {
    setIndexAtual((prev) => (prev === 0 ? projetos.length - 1 : prev - 1));
  };

  if (carregando) {
    return (
      <section id="projetos" className="py-12 sm:py-16 border-t border-current/10 scroll-mt-6">
        <div className="flex items-center gap-3 mb-8">
          <FolderGit2 className="w-6 h-6 text-amber-500" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projetos & Expansões</h2>
        </div>
        <div className="text-center py-12 opacity-75">
          <p className="animate-pulse">Consultando os arquivos da taverna (GitHub)...</p>
        </div>
      </section>
    );
  }

  if (projetos.length === 0) return null;

  const projeto = projetos[indexAtual];

  return (
    <section id="projetos" className="py-12 sm:py-16 border-t border-current/10 scroll-mt-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <FolderGit2 className="w-6 h-6 text-amber-500 flex-shrink-0" />
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projetos & Expansões</h2>
        </div>
        <span className="text-xs sm:text-sm font-mono opacity-60 whitespace-nowrap">
          {indexAtual + 1} de {projetos.length}
        </span>
      </div>

      {/* Container Principal */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        {/* Seta Esquerda (Apenas Telas Médias e Grandes) */}
        <button
          onClick={projetoAnterior}
          className={`hidden md:flex p-3 rounded-full border transition-all z-10 flex-shrink-0 cursor-pointer ${
            tema === 'noite'
              ? 'border-amber-400/20 hover:bg-amber-400/10 text-amber-100 hover:border-amber-400/50'
              : 'border-slate-800/20 hover:bg-slate-900/10 text-slate-900 hover:border-slate-800/50'
          }`}
          aria-label="Projeto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Card Destaque Unificado */}
        <div
          className={`w-full max-w-3xl min-h-[280px] p-5 sm:p-8 md:p-10 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            tema === 'noite'
              ? 'bg-slate-900/60 border-amber-400/20 shadow-xl shadow-amber-500/5'
              : 'bg-amber-100/40 border-slate-800/15 shadow-md'
          }`}
        >
          <div>
            <div className="flex items-start justify-between gap-3 mb-4">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
                {projeto.titulo}
              </h3>
              {projeto.estrelas > 0 && (
                <span className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber-500 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  {projeto.estrelas}
                </span>
              )}
            </div>

            {/* Descrição */}
            <p className="text-sm sm:text-base md:text-lg opacity-85 leading-relaxed mb-6 sm:mb-8">
              {projeto.descricao}
            </p>
          </div>

          <div>
            {/* Badges de Tecnologias */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
              {projeto.tags?.map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md font-mono border ${
                    tema === 'noite'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-slate-900/10 border-slate-900/20 text-slate-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links do Projeto */}
            <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-current/10">
              {projeto.linkGithub && (
                <a
                  href={projeto.linkGithub}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold hover:opacity-100 opacity-80 transition-opacity"
                >
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Ver Código no GitHub</span>
                </a>
              )}
              {projeto.linkDemo && (
                <a
                  href={projeto.linkDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-500 hover:underline"
                >
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>Acessar Demonstração</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Seta Direita (Apenas Telas Médias e Grandes) */}
        <button
          onClick={proximoProjeto}
          className={`hidden md:flex p-3 rounded-full border transition-all z-10 flex-shrink-0 cursor-pointer ${
            tema === 'noite'
              ? 'border-amber-400/20 hover:bg-amber-400/10 text-amber-100 hover:border-amber-400/50'
              : 'border-slate-800/20 hover:bg-slate-900/10 text-slate-900 hover:border-slate-800/50'
          }`}
          aria-label="Próximo projeto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Controles para Celular (Aparecem apenas abaixo do card em telas pequenas) */}
        <div className="flex md:hidden items-center justify-between w-full px-2 mt-2">
          <button
            onClick={projetoAnterior}
            className={`flex items-center gap-1 px-3.5 py-2 rounded-xl border text-xs font-bold ${
              tema === 'noite'
                ? 'border-amber-400/20 bg-slate-900/80 text-amber-100'
                : 'border-slate-800/20 bg-amber-100 text-slate-900'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-1.5">
            {projetos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndexAtual(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === indexAtual ? 'w-6 bg-amber-500' : 'w-2 bg-current/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={proximoProjeto}
            className={`flex items-center gap-1 px-3.5 py-2 rounded-xl border text-xs font-bold ${
              tema === 'noite'
                ? 'border-amber-400/20 bg-slate-900/80 text-amber-100'
                : 'border-slate-800/20 bg-amber-100 text-slate-900'
            }`}
          >
            <span>Próximo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}