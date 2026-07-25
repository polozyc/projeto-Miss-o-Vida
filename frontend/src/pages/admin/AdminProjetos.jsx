import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, FolderKanban } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../../components/Button";
import api from "../../api/api";

const CATEGORIAS = [
  { valor: "esporte", label: "Esporte" },
  { valor: "educacao", label: "Educação" },
  { valor: "social", label: "Ações Sociais" },
  { valor: "evento", label: "Eventos Comunitários" }
];

const formularioVazio = {
  categoria: "esporte",
  titulo: "",
  descricao: "",
  tag: "",
  imagem_url: "",
  ordem: 0,
  ativo: true
};

export default function AdminProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState(formularioVazio);
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarProjetos() {
    setCarregando(true);
    try {
      const { data } = await api.get("/projetos/admin/todos");
      setProjetos(data);
    } catch (err) {
      setErro("Não foi possível carregar os projetos.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarProjetos();
  }, []);

  function abrirNovo() {
    setForm(formularioVazio);
    setEditandoId(null);
    setMostrarForm(true);
  }

  function abrirEdicao(projeto) {
    setForm({
      categoria: projeto.categoria,
      titulo: projeto.titulo,
      descricao: projeto.descricao,
      tag: projeto.tag || "",
      imagem_url: projeto.imagem_url || "",
      ordem: projeto.ordem,
      ativo: projeto.ativo
    });
    setEditandoId(projeto.id);
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
        await api.put(`/projetos/${editandoId}`, form);
      } else {
        await api.post("/projetos", form);
      }
      setMostrarForm(false);
      carregarProjetos();
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível salvar o projeto.");
    } finally {
      setEnviando(false);
    }
  }

  async function remover(id) {
    if (!window.confirm("Tem certeza que deseja excluir este projeto?")) return;
    try {
      await api.delete(`/projetos/${id}`);
      setProjetos((atual) => atual.filter((p) => p.id !== id));
    } catch (err) {
      alert("Não foi possível excluir o projeto.");
    }
  }

  function labelCategoria(valor) {
    return CATEGORIAS.find((c) => c.valor === valor)?.label || valor;
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-forest">Gestão de Projetos</h1>
        <Button variant="secondary" onClick={abrirNovo}>
          <Plus size={18} /> Novo projeto
        </Button>
      </div>
      <p className="text-ink/60 mb-8">
        Edite os cards de projetos exibidos na Home e na página Projetos — incluindo a
        imagem, sem precisar mexer em código.
      </p>

      {mostrarForm && (
        <form onSubmit={salvar} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 mb-8 grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-forest">
              {editandoId ? "Editar projeto" : "Novo projeto"}
            </h2>
            <button type="button" onClick={() => setMostrarForm(false)} className="text-ink/50 hover:text-ink">
              <X size={20} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1.5">Categoria</label>
              <select
                name="categoria" value={form.categoria} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest bg-white"
              >
                {CATEGORIAS.map((c) => (
                  <option key={c.valor} value={c.valor}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1.5">Tag (etiqueta do card)</label>
              <input
                name="tag" value={form.tag} onChange={atualizarCampo}
                placeholder="Ex: 6 a 12 anos"
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">Título</label>
            <input
              name="titulo" required value={form.titulo} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">Descrição</label>
            <textarea
              name="descricao" required rows={3} value={form.descricao} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">URL da imagem</label>
            <input
              name="imagem_url" value={form.imagem_url} onChange={atualizarCampo}
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
            />
            {form.imagem_url && (
              <img
                src={form.imagem_url}
                alt="Pré-visualização"
                className="mt-3 h-32 w-full max-w-xs rounded-xl object-cover ring-1 ring-forest/10"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1.5">Ordem de exibição</label>
              <input
                type="number" name="ordem" value={form.ordem} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink/80 pb-3">
              <input type="checkbox" name="ativo" checked={form.ativo} onChange={atualizarCampo} className="h-4 w-4" />
              Exibir no site
            </label>
          </div>

          {erro && <p className="text-sm font-medium text-coral-dark">{erro}</p>}

          <Button type="submit" variant="secondary" className="justify-self-start" disabled={enviando}>
            {enviando ? "Salvando..." : "Salvar projeto"}
          </Button>
        </form>
      )}

      {carregando ? (
        <p className="text-ink/50">Carregando projetos...</p>
      ) : projetos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-ink/40 py-16">
          <FolderKanban size={32} />
          <p>Nenhum projeto cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projetos.map((p) => (
            <div key={p.id} className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest/5">
              {p.imagem_url && (
                <img src={p.imagem_url} alt={p.titulo} className="h-24 w-full sm:w-32 rounded-xl object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-forest/10 text-forest">
                    {labelCategoria(p.categoria)}
                  </span>
                  <h3 className="font-display font-semibold text-forest">{p.titulo}</h3>
                  {!p.ativo && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-ink/10 text-ink/50">
                      Oculto
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink/60 mt-1 line-clamp-2">{p.descricao}</p>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                <button onClick={() => abrirEdicao(p)} className="flex items-center gap-1 rounded-full bg-forest/10 text-forest px-3 py-1.5 text-xs font-semibold hover:bg-forest/20">
                  <Pencil size={14} /> Editar
                </button>
                <button onClick={() => remover(p.id)} className="flex items-center gap-1 rounded-full bg-coral/10 text-coral px-3 py-1.5 text-xs font-semibold hover:bg-coral/20">
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
