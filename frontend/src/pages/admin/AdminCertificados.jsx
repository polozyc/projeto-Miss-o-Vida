import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, ShieldCheck, ExternalLink } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../../components/Button";
import api from "../../api/api";
import { resolverUrlArquivo } from "../../utils/url";

const CATEGORIAS = [
  { valor: "regularidade", label: "Regularidade Cadastral" },
  { valor: "registro", label: "Registro em Conselho" },
  { valor: "licenca", label: "Licença/Alvará" },
  { valor: "estatutario", label: "Estatutário (Ata, Estatuto)" },
  { valor: "documento", label: "Outro documento" }
];

const formularioVazio = {
  titulo: "",
  descricao: "",
  categoria: "documento",
  arquivo_url: "",
  data_referencia: "",
  ordem: 0,
  ativo: true
};

export default function AdminCertificados() {
  const [certificados, setCertificados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [form, setForm] = useState(formularioVazio);
  const [editandoId, setEditandoId] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregarCertificados() {
    setCarregando(true);
    try {
      const { data } = await api.get("/certificados/admin/todos");
      setCertificados(data);
    } catch (err) {
      setErro("Não foi possível carregar os certificados.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCertificados();
  }, []);

  function abrirNovo() {
    setForm(formularioVazio);
    setEditandoId(null);
    setMostrarForm(true);
  }

  function abrirEdicao(cert) {
    setForm({
      titulo: cert.titulo,
      descricao: cert.descricao || "",
      categoria: cert.categoria,
      arquivo_url: cert.arquivo_url,
      data_referencia: cert.data_referencia || "",
      ordem: cert.ordem,
      ativo: cert.ativo
    });
    setEditandoId(cert.id);
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
        await api.put(`/certificados/${editandoId}`, form);
      } else {
        await api.post("/certificados", form);
      }
      setMostrarForm(false);
      carregarCertificados();
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível salvar o certificado.");
    } finally {
      setEnviando(false);
    }
  }

  async function remover(id) {
    if (!window.confirm("Tem certeza que deseja excluir este certificado?")) return;
    try {
      await api.delete(`/certificados/${id}`);
      setCertificados((atual) => atual.filter((c) => c.id !== id));
    } catch (err) {
      alert("Não foi possível excluir o certificado.");
    }
  }

  function labelCategoria(valor) {
    return CATEGORIAS.find((c) => c.valor === valor)?.label || valor;
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
        <h1 className="font-display text-2xl md:text-3xl font-semibold text-forest">Gestão de Certificados</h1>
        <Button variant="secondary" onClick={abrirNovo}>
          <Plus size={18} /> Novo certificado
        </Button>
      </div>
      <p className="text-ink/60 mb-2">
        Documentos exibidos publicamente na página "Certificados" do site.
      </p>
      <p className="text-xs text-ink/50 mb-8 bg-forest/[0.04] rounded-xl p-3">
        <strong>Dica sobre o link do arquivo:</strong> cole aqui a URL completa de onde o PDF
        está hospedado (por exemplo, um link do Google Drive com compartilhamento público,
        ou qualquer outro link direto para o arquivo). Novos documentos não ficam salvos
        dentro do próprio site — apenas o link cadastrado aqui.
      </p>

      {mostrarForm && (
        <form onSubmit={salvar} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 mb-8 grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-forest">
              {editandoId ? "Editar certificado" : "Novo certificado"}
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
              <label className="block text-sm font-medium text-ink/80 mb-1.5">Validade/Referência (opcional)</label>
              <input
                name="data_referencia" value={form.data_referencia} onChange={atualizarCampo}
                placeholder="Ex: Válido até 31/12/2025"
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">Descrição (opcional)</label>
            <textarea
              name="descricao" rows={2} value={form.descricao} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink/80 mb-1.5">Link do arquivo (PDF)</label>
            <input
              name="arquivo_url" required value={form.arquivo_url} onChange={atualizarCampo}
              placeholder="https://drive.google.com/..."
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
            />
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
            {enviando ? "Salvando..." : "Salvar certificado"}
          </Button>
        </form>
      )}

      {carregando ? (
        <p className="text-ink/50">Carregando certificados...</p>
      ) : certificados.length === 0 ? (
        <div className="flex flex-col items-center gap-3 text-ink/40 py-16">
          <ShieldCheck size={32} />
          <p>Nenhum certificado cadastrado ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {certificados.map((c) => (
            <div key={c.id} className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest/5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-forest/10 text-forest">
                    {labelCategoria(c.categoria)}
                  </span>
                  <h3 className="font-display font-semibold text-forest">{c.titulo}</h3>
                  {!c.ativo && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-ink/10 text-ink/50">
                      Oculto
                    </span>
                  )}
                </div>
                {c.descricao && <p className="text-sm text-ink/60 mt-1 line-clamp-2">{c.descricao}</p>}
                <a
                  href={resolverUrlArquivo(c.arquivo_url)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-forest/70 hover:text-forest mt-2 underline"
                >
                  <ExternalLink size={12} /> Ver arquivo
                </a>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                <button onClick={() => abrirEdicao(c)} className="flex items-center gap-1 rounded-full bg-forest/10 text-forest px-3 py-1.5 text-xs font-semibold hover:bg-forest/20">
                  <Pencil size={14} /> Editar
                </button>
                <button onClick={() => remover(c.id)} className="flex items-center gap-1 rounded-full bg-coral/10 text-coral px-3 py-1.5 text-xs font-semibold hover:bg-coral/20">
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
