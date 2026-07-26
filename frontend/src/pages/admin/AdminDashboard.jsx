import React, { useEffect, useState } from "react";
import { Image, Newspaper, Mail, FolderKanban, ShieldCheck } from "lucide-react";
import AdminLayout from "./AdminLayout";
import api from "../../api/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projetos: 0, certificados: 0, galeria: 0, noticias: 0, naoLidas: 0 });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [projetos, certificados, galeria, noticias, mensagens] = await Promise.all([
          api.get("/projetos/admin/todos"),
          api.get("/certificados/admin/todos"),
          api.get("/galeria"),
          api.get("/noticias/admin/todas"),
          api.get("/mensagens")
        ]);
        setStats({
          projetos: projetos.data.length,
          certificados: certificados.data.length,
          galeria: galeria.data.length,
          noticias: noticias.data.length,
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
    { label: "Projetos cadastrados", valor: stats.projetos, icon: FolderKanban, cor: "bg-forest/10 text-forest" },
    { label: "Certificados publicados", valor: stats.certificados, icon: ShieldCheck, cor: "bg-marigold/20 text-marigold-dark" },
    { label: "Fotos na galeria", valor: stats.galeria, icon: Image, cor: "bg-forest/10 text-forest" },
    { label: "Mensagens não lidas", valor: stats.naoLidas, icon: Mail, cor: "bg-coral/10 text-coral" }
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
