import React, { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, Inbox, Gift } from "lucide-react";
import AdminLayout from "./AdminLayout";
import api from "../../api/api";

export default function AdminMensagens() {
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState("todas"); // todas | contato | doacao | nao-lidas

  async function carregarMensagens() {
    setCarregando(true);
    try {
      const { data } = await api.get("/mensagens");
      setMensagens(data);
    } catch (err) {
      console.error(err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarMensagens();
  }, []);

  async function marcarComoLida(id) {
    try {
      await api.patch(`/mensagens/${id}/lida`);
      setMensagens((atual) => atual.map((m) => (m.id === id ? { ...m, lida: true } : m)));
    } catch (err) {
      alert("Não foi possível marcar como lida.");
    }
  }

  async function remover(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta mensagem?")) return;
    try {
      await api.delete(`/mensagens/${id}`);
      setMensagens((atual) => atual.filter((m) => m.id !== id));
    } catch (err) {
      alert("Não foi possível excluir a mensagem.");
    }
  }

  const mensagensFiltradas = mensagens.filter((m) => {
    if (filtro === "nao-lidas") return !m.lida;
    if (filtro === "contato" || filtro === "doacao") return m.assunto === filtro;
    return true;
  });

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-forest mb-2">Mensagens Recebidas</h1>
      <p className="text-ink/60 mb-6">Mensagens enviadas pelos formulários de contato e doação do site.</p>

      <div className="flex gap-2 mb-6 flex-wrap">
        {[
          { valor: "todas", label: "Todas" },
          { valor: "nao-lidas", label: "Não lidas" },
          { valor: "contato", label: "Contato" },
          { valor: "doacao", label: "Doações" }
        ].map((f) => (
          <button
            key={f.valor}
            onClick={() => setFiltro(f.valor)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filtro === f.valor ? "bg-forest text-white" : "bg-white text-ink/60 ring-1 ring-forest/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {carregando ? (
        <p className="text-ink/50">Carregando mensagens...</p>
      ) : mensagensFiltradas.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-ink/40 py-16">
          <Inbox size={32} />
          <p>Nenhuma mensagem encontrada.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {mensagensFiltradas.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ${m.lida ? "ring-forest/5" : "ring-marigold/40"}`}
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-semibold text-forest">{m.nome}</h3>
                    <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      m.assunto === "doacao" ? "bg-marigold/20 text-marigold-dark" : "bg-forest/10 text-forest"
                    }`}>
                      {m.assunto === "doacao" ? <><Gift size={12}/> Doação</> : "Contato"}
                    </span>
                    {!m.lida && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-coral/10 text-coral">
                        Nova
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-ink/60 mt-0.5">
                    {m.email} {m.telefone && `· ${m.telefone}`}
                  </p>
                </div>
                <p className="text-xs text-ink/40 shrink-0">
                  {new Date(m.criado_em).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                </p>
              </div>

              <p className="mt-3 text-sm text-ink/80 leading-relaxed">{m.mensagem}</p>

              <div className="flex gap-2 mt-4">
                {!m.lida && (
                  <button
                    onClick={() => marcarComoLida(m.id)}
                    className="flex items-center gap-1 rounded-full bg-forest/10 text-forest px-3 py-1.5 text-xs font-semibold hover:bg-forest/20"
                  >
                    <MailOpen size={14} /> Marcar como lida
                  </button>
                )}
                <button
                  onClick={() => remover(m.id)}
                  className="flex items-center gap-1 rounded-full bg-coral/10 text-coral px-3 py-1.5 text-xs font-semibold hover:bg-coral/20"
                >
                  <Trash2 size={14} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
