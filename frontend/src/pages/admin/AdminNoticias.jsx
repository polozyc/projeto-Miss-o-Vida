import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Newspaper } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../../components/Button";
import api from "../../api/api";

const formularioVazio = { titulo: "", resumo: "", conteudo: "", imagem_url: "", publicado: true };

export default function AdminNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState(formularioVazio);
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarNoticias() {
    setCarregando(true);
    try {
      const { data } = await api.get("/noticias/admin/todas");
      setNoticias(data);
    } catch (err) {
      setErro("Não foi possível carregar as notícias.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarNoticias();
  }, []);

  function abrirNovo() {
    setForm(formularioVazio);
    setEditandoId(null);
    setMostrarForm(true);
  }

  function abrirEdicao(noticia) {
    setForm({
      titulo: noticia.titulo,
      resumo: noticia.resumo || "",
      conteudo: noticia.conteudo,
      imagem_url: noticia.imagem_url || "",
      publicado: noticia.publicado
    });
    setEditandoId(noticia.id);
    setMostrarForm(true);
  }

  function atualizarCampo(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function salvar(e) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    try {
      if (editandoId) {
        await api.put(`/noticias/${editandoId}`, form);
      } else {
        await api.post("/noticias", form);
      }
      setMostrarForm(false);
      carregarNoticias();
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível salvar a notícia.");
    } finally {
      setEnviando(false);
    }
  }

  async function remover(id) {
    if (!window.confirm("Tem certeza que deseja excluir esta notícia?")) return;
    try {
      await api.delete(`/noticias/${id}`);
      setNoticias((atual) => atual.filter((n) => n.id !== id));
    } catch (err) {
      alert("Não foi possível excluir a notícia.");
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-forest">Gestão de Notícias</h1>
        <Button variant="secondary" onClick={abrirNovo}>
          <Plus size={18} /> Nova notícia
        </Button>
      </div>
      <p className="text-ink/60 mb-8">Crie, edite e publique notícias exibidas no site institucional.</p>

      {mostrarForm && (
        <form onSubmit={salvar} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 mb-8 grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-forest">
              {editandoId ? "Editar notícia" : "Nova notícia"}
            </h2>
            <button type="button" onClick={() => setMostrarForm(false)} className="text-ink/50 hover:text-ink">
              <X size={20} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">Título</label>
            <input
              name="titulo" required value={form.titulo} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">Resumo</label>
            <input
              name="resumo" value={form.resumo} onChange={atualizarCampo}
              placeholder="Breve resumo exibido nos cards"
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">URL da imagem de capa</label>
            <input
              name="imagem_url" value={form.imagem_url} onChange={atualizarCampo}
              placeholder="https://exemplo.com/imagem.jpg"
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">Conteúdo</label>
            <textarea
              name="conteudo" required rows={6} value={form.conteudo} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest resize-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-ink/80">
            <input type="checkbox" name="publicado" checked={form.publicado} onChange={atualizarCampo} className="h-4 w-4" />
            Publicar no site
          </label>

          {erro && <p className="text-sm font-medium text-coral-dark">{erro}</p>}

          <Button type="submit" variant="secondary" className="justify-self-start" disabled={enviando}>
            {enviando ? "Salvando..." : "Salvar notícia"}
          </Button>
        </form>
      )}

      {carregando ? (
        <p className="text-ink/50">Carregando notícias...</p>
      ) : noticias.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-ink/40 py-16">
          <Newspaper size={32} />
          <p>Nenhuma notícia cadastrada ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {noticias.map((n) => (
            <div key={n.id} className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest/5">
              {n.imagem_url && (
                <img src={n.imagem_url} alt={n.titulo} className="h-24 w-full sm:w-32 rounded-xl object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display font-semibold text-forest">{n.titulo}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${n.publicado ? "bg-forest/10 text-forest" : "bg-ink/10 text-ink/50"}`}>
                    {n.publicado ? "Publicada" : "Rascunho"}
                  </span>
                </div>
                <p className="text-sm text-ink/60 mt-1 line-clamp-2">{n.resumo}</p>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                <button onClick={() => abrirEdicao(n)} className="flex items-center gap-1 rounded-full bg-forest/10 text-forest px-3 py-1.5 text-xs font-semibold hover:bg-forest/20">
                  <Pencil size={14} /> Editar
                </button>
                <button onClick={() => remover(n.id)} className="flex items-center gap-1 rounded-full bg-coral/10 text-coral px-3 py-1.5 text-xs font-semibold hover:bg-coral/20">
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
