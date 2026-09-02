import { useState, useEffect } from 'react';
import { MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react';

export default function Reviews({ tema }) {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    comentario: '',
    estrelas: 5,
  });
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const carregarAvaliacoes = () => {
    fetch('http://127.0.0.1:8000/api/avaliacoes')
      .then((res) => res.json())
      .then((dados) => {
        if (Array.isArray(dados)) {
          setAvaliacoes(dados);
        }
      })
      .catch((err) => console.error('Erro ao carregar avaliações:', err));
  };

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    fetch('http://127.0.0.1:8000/api/avaliacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setEnviando(false);
        if (data.sucesso) {
          setSucesso(true);
          setFormData({ nome: '', cargo: '', comentario: '', estrelas: 5 });
          carregarAvaliacoes();
          setTimeout(() => setSucesso(false), 4000);
        }
      })
      .catch((err) => {
        console.error('Erro ao postar avaliação:', err);
        setEnviando(false);
      });
  };

  return (
    <section id="avaliacoes" className="py-16 border-t border-current/10 scroll-mt-6">
      <div className="flex items-center gap-3 mb-10">
        <MessageSquare className="w-6 h-6 text-amber-500" />
        <h2 className="text-3xl font-bold tracking-tight">Mural do Taverneiro</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Coluna de Envio (Formulário) */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className={`p-6 rounded-2xl border space-y-4 ${
              tema === 'noite'
                ? 'bg-slate-900/60 border-amber-400/20'
                : 'bg-amber-100/40 border-slate-800/15'
            }`}
          >
            <h3 className="text-xl font-bold mb-2">Deixe sua Avaliação</h3>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">
                Seu Nome
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Maria Silva"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none ${
                  tema === 'noite'
                    ? 'bg-slate-950/80 border-amber-400/20 text-amber-100'
                    : 'bg-amber-50/80 border-slate-800/20 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">
                Seu Cargo / Empresa (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ex: Recrutadora / Dev Senior"
                value={formData.cargo}
                onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none ${
                  tema === 'noite'
                    ? 'bg-slate-950/80 border-amber-400/20 text-amber-100'
                    : 'bg-amber-50/80 border-slate-800/20 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 opacity-80">
                Sua Nota
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setFormData({ ...formData, estrelas: num })}
                    className="p-1 text-amber-500 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        num <= formData.estrelas ? 'fill-amber-500' : 'opacity-30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 opacity-80">
                Seu Comentário
              </label>
              <textarea
                required
                rows={3}
                placeholder="O que achou do portfólio e das soluções?"
                value={formData.comentario}
                onChange={(e) => setFormData({ ...formData, comentario: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none ${
                  tema === 'noite'
                    ? 'bg-slate-950/80 border-amber-400/20 text-amber-100'
                    : 'bg-amber-50/80 border-slate-800/20 text-slate-900'
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full py-3 rounded-lg font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{enviando ? 'Publicando...' : 'Publicar no Mural'}</span>
            </button>

            {sucesso && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Avaliação registrada no mural com sucesso!</span>
              </div>
            )}
          </form>
        </div>

        {/* Coluna de Exibição das Avaliações (Mural) */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
          {avaliacoes.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-xl border transition-all ${
                tema === 'noite'
                  ? 'bg-slate-900/40 border-amber-400/15'
                  : 'bg-amber-100/30 border-slate-800/10'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <div>
                  <h4 className="font-bold text-base">{item.nome}</h4>
                  <p className="text-xs opacity-60">{item.cargo}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: item.estrelas }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
              </div>
              <p className="text-sm opacity-85 leading-relaxed">{item.comentario}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}