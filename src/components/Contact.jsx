import { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact({ tema }) {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    fetch('https://tavern-portfolio.onrender.com/api/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setEnviando(false);
        if (data.sucesso) {
          setSucesso(true);
          setFormData({ nome: '', email: '', mensagem: '' });
          setTimeout(() => setSucesso(false), 5000);
        }
      })
      .catch((err) => {
        console.error('Erro ao enviar mensagem:', err);
        setEnviando(false);
      });
  };

  return (
    <section id="contato" className="py-16 border-t border-current/10 scroll-mt-6">
      <div className="flex items-center gap-3 mb-10">
        <Mail className="w-6 h-6 text-amber-500" />
        <h2 className="text-3xl font-bold tracking-tight">Contato & Mensagens</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Coluna 1: Informações de Contato */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Mande um pergaminho</h3>
          
          <p className="opacity-80 leading-relaxed text-sm">
            Mande uma coruja ou deixe sua mensagem no pergaminho ao lado! 
            Seja para discutir oportunidades de trabalho, projetos de automação em Python ou parcerias web, a taverna está sempre aberta.
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 text-sm font-medium">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                <Mail className="w-5 h-5" />
              </div>
              <span>kennedyveras2005@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 text-sm font-medium">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                <MapPin className="w-5 h-5" />
              </div>
              <span>Recife - PE, Brasil</span>
            </div>
          </div>
        </div>

        {/* Coluna 2: Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">
              Seu Nome / Título
            </label>
            <input
              type="text"
              name="nome"
              required
              value={formData.nome}
              onChange={handleChange}
              placeholder="Ex: Arthur Pendelton"
              className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all ${
                tema === 'noite'
                  ? 'bg-slate-900/80 border-amber-400/20 focus:border-amber-400 text-amber-100'
                  : 'bg-amber-100/50 border-slate-800/20 focus:border-slate-900 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">
              Seu E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@gmail.com"
              className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all ${
                tema === 'noite'
                  ? 'bg-slate-900/80 border-amber-400/20 focus:border-amber-400 text-amber-100'
                  : 'bg-amber-100/50 border-slate-800/20 focus:border-slate-900 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">
              Sua Mensagem
            </label>
            <textarea
              name="mensagem"
              required
              rows={4}
              value={formData.mensagem}
              onChange={handleChange}
              placeholder="Escreva seu recado para o taverneiro..."
              className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all ${
                tema === 'noite'
                  ? 'bg-slate-900/80 border-amber-400/20 focus:border-amber-400 text-amber-100'
                  : 'bg-amber-100/50 border-slate-800/20 focus:border-slate-900 text-slate-900'
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="w-full py-3.5 px-6 rounded-lg font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {enviando ? (
              <span>Entregando pergaminho...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Enviar Pergaminho</span>
              </>
            )}
          </button>

          {sucesso && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm mt-3">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>Sua mensagem foi enviada com sucesso!</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}