import { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact({ tema }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    setEnviado(true);
    setFormData({ nome: '', email: '', mensagem: '' });

    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <section id="contato" className="py-16 border-t border-current/10 mb-12">
      {/* Cabeçalho da Seção */}
      <div className="flex items-center gap-3 mb-10">
        <MessageSquare className="w-6 h-6 text-amber-500" />
        <h2 className="text-3xl font-bold tracking-tight">Contato & Taverna</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Coluna 1: Informações de Contato */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Vamos conversar?</h3>
          <p className="opacity-80 leading-relaxed text-sm">
            Sente-se à mesa e mande seu recado. Se você procura um desenvolvedor para criar automações, APIs em Python ou interfaces web, a taverna está aberta para novas parcerias!
          </p>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs opacity-60">E-mail</p>
                <p className="text-sm font-semibold">kennedyveras2005@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs opacity-60">Localização</p>
                <p className="text-sm font-semibold">Recife - PE, Brasil</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 2: Formulário */}
        <div className={`p-6 rounded-xl border ${
          tema === 'noite'
            ? 'bg-slate-900/60 border-amber-400/20'
            : 'bg-amber-100/40 border-slate-800/15'
        }`}>
          {enviado ? (
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center py-8">
              <p className="font-bold text-base mb-1">Mensagem enviada!</p>
              <p className="text-xs opacity-80">Obrigado pelo contato. Responderei em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">Seu Nome</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Maria Silva"
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm border outline-none transition-colors ${
                    tema === 'noite'
                      ? 'bg-slate-950/60 border-amber-400/20 focus:border-amber-400/60 text-amber-100'
                      : 'bg-white/80 border-slate-800/20 focus:border-slate-800/60 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">Seu E-mail</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="maria@exemplo.com"
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm border outline-none transition-colors ${
                    tema === 'noite'
                      ? 'bg-slate-950/60 border-amber-400/20 focus:border-amber-400/60 text-amber-100'
                      : 'bg-white/80 border-slate-800/20 focus:border-slate-800/60 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1 opacity-80">Mensagem</label>
                <textarea
                  required
                  rows="4"
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  placeholder="Escreva sua mensagem aqui..."
                  className={`w-full px-3.5 py-2.5 rounded-lg text-sm border outline-none transition-colors resize-none ${
                    tema === 'noite'
                      ? 'bg-slate-950/60 border-amber-400/20 focus:border-amber-400/60 text-amber-100'
                      : 'bg-white/80 border-slate-800/20 focus:border-slate-800/60 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ${
                  tema === 'noite'
                    ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                    : 'bg-slate-900 text-amber-50 hover:bg-slate-800'
                }`}
              >
                Enviar Mensagem
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}