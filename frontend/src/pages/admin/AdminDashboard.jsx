import React, { useEffect, useState } from "react";
import { Image, Newspaper, MessageSquare, Mail } from "lucide-react";
import AdminLayout from "./AdminLayout";
import api from "../../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ galeria: 0, noticias: 0, mensagens: 0, naoLidas: 0 });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [galeria, noticias, mensagens] = await Promise.all([
          api.get("/galeria"),
          api.get("/noticias/admin/todas"),
          api.get("/mensagens")
        ]);
        setStats({
          galeria: galeria.data.length,
          noticias: noticias.data.length,
          mensagens: mensagens.data.length,
          naoLidas: mensagens.data.filter((m) => !m.lida).length
        });
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  const cards = [
    { label: "Fotos na galeria", valor: stats.galeria, icon: Image, cor: "bg-forest/10 text-forest" },
    { label: "Notícias publicadas", valor: stats.noticias, icon: Newspaper, cor: "bg-marigold/20 text-marigold-dark" },
    { label: "Mensagens recebidas", valor: stats.mensagens, icon: MessageSquare, cor: "bg-coral/10 text-coral" },
    { label: "Mensagens não lidas", valor: stats.naoLidas, icon: Mail, cor: "bg-forest/10 text-forest" }
  ];

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-forest mb-2">Visão geral</h1>
      <p className="text-ink/60 mb-8">Resumo rápido do conteúdo do site institucional.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl mb-4 ${c.cor}`}>
              <c.icon size={20} />
            </span>
            <p className="font-display text-3xl font-semibold text-forest">
              {carregando ? "…" : c.valor}
            </p>
            <p className="text-sm text-ink/60 mt-1">{c.label}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
