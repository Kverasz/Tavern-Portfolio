import { User, GraduationCap, Cpu, CheckCircle2 } from 'lucide-react';

export default function About({ tema }) {
  const habilidades = [
    'Python',
    'React.js & Vite',
    'Tailwind CSS',
    'FastAPI (Backend)',
    'PostgreSQL & Supabase',
    'Git & GitHub',
    'JavaScript & TypeScript',
    'Django / Django REST Framework (DRF)',
    'Firebase',
    'MongoDB',
    'MySql',
    'Excel',
    'SQL',
  ];

    const saudacao = tema === 'noite' 
        ? 'Boa noite, nobre visitante.' 
        : 'Bom dia, nobre visitante.';

  return (
    <section id="sobre" className="py-16 border-t border-current/10">
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-3 mb-10">
        <User className="w-6 h-6 text-amber-500" />
        <h2 className="text-3xl font-bold tracking-tight">Sobre Mim</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Coluna 1: Trajetória e Formação */}
        <div className="space-y-6">
          <p className="text-lg leading-relaxed opacity-90">
            <span className="font-semibold text-amber-500 block mb-1">
              {saudacao}
            </span>
            Me chamo Kennedy, sou estudante de <span className="font-semibold text-amber-500">Análise e Desenvolvimento de Sistemas</span>, com foco em Backend e Full Stack. Gosto de transformar ideias e problemas reais em soluções funcionais, utilizando código para criar aplicações, APIs e automações.
          </p>

          <p className="opacity-80 leading-relaxed text-sm">
            Tenho experiência acadêmica e em projetos próprios com Python, FastAPI, React, TypeScript, PostgreSQL e Git, e estou constantemente buscando aprimorar minhas habilidades e aprender novas tecnologias.
          </p>

          {/* Card de Formação */}
          <div className={`p-5 rounded-xl border flex items-start gap-4 transition-all ${
            tema === 'noite'
              ? 'bg-slate-900/60 border-amber-400/20'
              : 'bg-amber-100/40 border-slate-800/15'
          }`}>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 mt-0.5">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base">Análise e Desenvolvimento de Sistemas</h4>
              <p className="text-xs opacity-75 mt-0.5">Faculdade Senac Pernambuco (Senac/PE) • Embarque Digital</p>
              <p className="text-xs opacity-60 mt-2">Foco em Engenharia de Software, Banco de Dados e Desenvolvimento Web/Backend.</p>
            </div>
          </div>
        </div>

        {/* Coluna 2: Habilidades & Ferramentas */}
        <div className={`p-6 rounded-xl border ${
          tema === 'noite'
            ? 'bg-slate-900/40 border-amber-400/15'
            : 'bg-amber-100/30 border-slate-800/10'
        }`}>
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold">Tecnologias & Ferramentas</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {habilidades.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2.5 text-sm font-medium opacity-85"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}