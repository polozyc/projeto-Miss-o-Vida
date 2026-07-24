import React, { useEffect, useState } from "react";
import { Trash2, Plus, ImageOff } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../../components/Button";
import api from "../../api/api";

export default function AdminGaleria() {
  const [fotos, setFotos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novaUrl, setNovaUrl] = useState("");
  const [novoTitulo, setNovoTitulo] = useState("");
  const [novaCategoria, setNovaCategoria] = useState("geral");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarFotos() {
    setCarregando(true);
    try {
      const { data } = await api.get("/galeria");
      setFotos(data);
    } catch (err) {
      setErro("Não foi possível carregar a galeria.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarFotos();
  }, []);

  async function adicionarFoto(e) {
    e.preventDefault();
    if (!novaUrl.trim()) return;
    setEnviando(true);
    setErro("");
    try {
      await api.post("/galeria", {
        imagem_url: novaUrl.trim(),
        titulo: novoTitulo.trim() || null,
        categoria: novaCategoria
      });
      setNovaUrl("");
      setNovoTitulo("");
      setNovaCategoria("geral");
      carregarFotos();
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível adicionar a foto.");
    } finally {
      setEnviando(false);
    }
  }

  async function removerFoto(id) {
    if (!window.confirm("Tem certeza que deseja remover esta foto?")) return;
    try {
      await api.delete(`/galeria/${id}`);
      setFotos((atual) => atual.filter((f) => f.id !== id));
    } catch (err) {
      alert("Não foi possível remover a foto.");
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-forest mb-2">Gestão de Galeria</h1>
      <p className="text-ink/60 mb-8">Adicione ou remova fotos exibidas na galeria pública do site.</p>

      <form onSubmit={adicionarFoto} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 mb-8 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ink/80 mb-1.5">URL da imagem</label>
          <input
            value={novaUrl}
            onChange={(e) => setNovaUrl(e.target.value)}
            required
            placeholder="https://exemplo.com/foto.jpg"
            className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/80 mb-1.5">Título (opcional)</label>
          <input
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
            placeholder="Ex: Oficina de futebol"
            className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink/80 mb-1.5">Categoria</label>
          <select
            value={novaCategoria}
            onChange={(e) => setNovaCategoria(e.target.value)}
            className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest bg-white"
          >
            <option value="geral">Geral</option>
            <option value="esporte">Esporte</option>
            <option value="acao-social">Ação social</option>
            <option value="educacao">Educação</option>
            <option value="evento">Evento</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" variant="secondary" disabled={enviando}>
            <Plus size={18} /> {enviando ? "Adicionando..." : "Adicionar foto"}
          </Button>
        </div>
        {erro && <p className="sm:col-span-2 text-sm font-medium text-coral-dark">{erro}</p>}
      </form>

      {carregando ? (
        <p className="text-ink/50">Carregando fotos...</p>
      ) : fotos.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-ink/40 py-16">
          <ImageOff size={32} />
          <p>Nenhuma foto cadastrada ainda.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {fotos.map((foto) => (
            <div key={foto.id} className="group relative rounded-2xl overflow-hidden shadow-sm ring-1 ring-forest/5">
              <img src={foto.imagem_url} alt={foto.titulo || "Foto da galeria"} className="h-40 w-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end p-3">
                <button
                  onClick={() => removerFoto(foto.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 rounded-full bg-coral px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Trash2 size={14} /> Remover
                </button>
              </div>
              {foto.titulo && (
                <p className="absolute top-2 left-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-forest">
                  {foto.titulo}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
