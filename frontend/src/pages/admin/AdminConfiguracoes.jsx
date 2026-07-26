import React, { useEffect, useState } from "react";
import { Save, Phone, Mail, MapPin, Clock, QrCode, Instagram, Facebook } from "lucide-react";
import AdminLayout from "./AdminLayout";
import Button from "../../components/Button";
import api from "../../api/api";
import { useConfig } from "../../context/ConfigContext";

const TIPOS_PIX = [
  { valor: "email", label: "E-mail" },
  { valor: "cpf", label: "CPF" },
  { valor: "cnpj", label: "CNPJ" },
  { valor: "telefone", label: "Telefone" },
  { valor: "aleatoria", label: "Chave aleatória" }
];

export default function AdminConfiguracoes() {
  const { config, recarregarConfig } = useConfig();
  const [form, setForm] = useState(config);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  // Sincroniza o formulário assim que as configurações reais chegarem da API
  useEffect(() => {
    setForm(config);
  }, [config]);

  function atualizarCampo(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar(e) {
    e.preventDefault();
    setEnviando(true);
    setErro("");
    setSucesso(false);
    try {
      await api.put("/configuracoes", form);
      await recarregarConfig();
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível salvar as configurações.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AdminLayout>
      <h1 className="font-display text-2xl md:text-3xl font-semibold text-forest mb-2">Configurações do Site</h1>
      <p className="text-ink/60 mb-8">
        Estes dados aparecem automaticamente no rodapé, na página de Contato e na página
        de Doações do site.
      </p>

      <form onSubmit={salvar} className="grid gap-8">
        {/* Contato */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 grid gap-4">
          <h2 className="font-display text-lg font-semibold text-forest">Dados de Contato</h2>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink/80 mb-1.5">
              <MapPin size={15} /> Endereço
            </label>
            <input
              name="endereco" value={form.endereco} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
              placeholder="Rua, número - Bairro, Cidade - UF"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-ink/80 mb-1.5">
                <Phone size={15} /> Telefone
              </label>
              <input
                name="telefone" value={form.telefone} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-ink/80 mb-1.5">
                <Mail size={15} /> E-mail
              </label>
              <input
                name="email" type="email" value={form.email} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
                placeholder="contato@missaovida.org.br"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink/80 mb-1.5">
              <Clock size={15} /> Horário de atendimento
            </label>
            <input
              name="horario_atendimento" value={form.horario_atendimento} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
              placeholder="Segunda a sexta, das 9h às 17h"
            />
          </div>
        </div>

        {/* Doação via Pix */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 grid gap-4">
          <h2 className="font-display text-lg font-semibold text-forest">Doação via Pix</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1.5">Chave Pix</label>
              <input
                name="pix_chave" value={form.pix_chave} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
                placeholder="chave@ong.org.br, CNPJ, telefone..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink/80 mb-1.5">Tipo da chave</label>
              <select
                name="pix_tipo" value={form.pix_tipo} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest bg-white"
              >
                {TIPOS_PIX.map((t) => (
                  <option key={t.valor} value={t.valor}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-ink/80 mb-1.5">
              <QrCode size={15} /> URL da imagem do QR Code (opcional)
            </label>
            <input
              name="pix_qrcode_url" value={form.pix_qrcode_url} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
              placeholder="https://exemplo.com/qrcode-pix.png"
            />
            <p className="text-xs text-ink/50 mt-1.5">
              Gere o QR Code no app do seu banco (opção "Pix Copia e Cola" ou similar),
              salve a imagem, hospede em algum link (ex: Google Drive público) e cole a
              URL aqui.
            </p>
            {form.pix_qrcode_url && (
              <img
                src={form.pix_qrcode_url}
                alt="Pré-visualização do QR Code"
                className="mt-3 h-32 w-32 rounded-xl object-contain ring-1 ring-forest/10 bg-white p-2"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            )}
          </div>
        </div>

        {/* Redes sociais */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 grid gap-4">
          <h2 className="font-display text-lg font-semibold text-forest">Redes Sociais</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-ink/80 mb-1.5">
                <Instagram size={15} /> Instagram
              </label>
              <input
                name="instagram_url" value={form.instagram_url} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
                placeholder="https://instagram.com/missaovida"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-ink/80 mb-1.5">
                <Facebook size={15} /> Facebook
              </label>
              <input
                name="facebook_url" value={form.facebook_url} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
                placeholder="https://facebook.com/missaovida"
              />
            </div>
          </div>
        </div>

        {erro && <p className="text-sm font-medium text-coral-dark">{erro}</p>}
        {sucesso && <p className="text-sm font-medium text-forest">Configurações salvas com sucesso!</p>}

        <Button type="submit" variant="secondary" className="justify-self-start" disabled={enviando}>
          <Save size={18} /> {enviando ? "Salvando..." : "Salvar configurações"}
        </Button>
      </form>
    </AdminLayout>
  );
}
