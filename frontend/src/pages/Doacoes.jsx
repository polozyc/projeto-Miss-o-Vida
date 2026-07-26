import React, { useState } from "react";
import { Copy, Check, HeartHandshake, Landmark, Gift, Users, QrCode } from "lucide-react";
import WaveDivider from "../components/WaveDivider";
import Button from "../components/Button";
import api from "../api/api";
import { useConfig } from "../context/ConfigContext";

export default function Doacoes() {
  const { config } = useConfig();
  const [copiado, setCopiado] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState(null); // 'sucesso' | 'erro' | null

  function copiarChave() {
    navigator.clipboard.writeText(config.pix_chave).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    });
  }

  function atualizarCampo(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function enviarFormulario(e) {
    e.preventDefault();
    setEnviando(true);
    setStatus(null);
    try {
      await api.post("/mensagens", { ...form, assunto: "doacao" });
      setStatus("sucesso");
      setForm({ nome: "", email: "", telefone: "", mensagem: "" });
    } catch (err) {
      setStatus("erro");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <section className="bg-forest pt-16 pb-24 md:pt-24 md:pb-32 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-marigold-light">
            <HeartHandshake size={16} /> Faça parte dessa missão
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold text-white text-balance">
            Sua doação transforma vidas de verdade
          </h1>
          <p className="mt-5 text-cream/80">
            Cada contribuição ajuda a manter nossos projetos esportivos, sociais e
            educacionais funcionando em Carapicuíba - SP.
          </p>
        </div>
        <WaveDivider />
      </section>

      {/* Como ajudar */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-coral">Como ajudar</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest text-balance">
            Existem várias formas de fazer a diferença
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-forest/5 text-center">
            <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-forest/10 text-forest mb-4">
              <Gift size={22} />
            </span>
            <h3 className="font-display font-semibold text-forest mb-2">Doação financeira</h3>
            <p className="text-sm text-ink/70">
              Contribua com qualquer valor via Pix, de forma única ou recorrente, e ajude a
              custear nossos projetos.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-forest/5 text-center">
            <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-marigold/20 text-marigold-dark mb-4">
              <Landmark size={22} />
            </span>
            <h3 className="font-display font-semibold text-forest mb-2">Doação de itens</h3>
            <p className="text-sm text-ink/70">
              Alimentos, roupas, materiais escolares e esportivos também fazem toda a
              diferença nas nossas ações.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-forest/5 text-center">
            <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-coral/10 text-coral mb-4">
              <Users size={22} />
            </span>
            <h3 className="font-display font-semibold text-forest mb-2">Trabalho voluntário</h3>
            <p className="text-sm text-ink/70">
              Doe seu tempo e habilidades em nossas oficinas, eventos e ações
              administrativas.
            </p>
          </div>
        </div>
      </section>

      {/* Pix */}
      <section className="bg-forest/[0.03] py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-coral">Doação via Pix</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest text-balance">
            Contribua agora mesmo
          </h2>

          {config.pix_chave ? (
            <>
              <p className="mt-4 text-ink/70">
                Use a chave Pix abaixo, ou aponte a câmera do seu banco para o QR Code,
                para fazer sua doação diretamente à ONG Missão Vida.
              </p>

              {config.pix_qrcode_url && (
                <div className="mt-8 flex flex-col items-center gap-3">
                  <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-forest/10">
                    <img
                      src={config.pix_qrcode_url}
                      alt="QR Code para doação via Pix"
                      className="h-52 w-52 object-contain"
                    />
                  </div>
                  <p className="text-xs text-ink/50 flex items-center gap-1.5">
                    <QrCode size={14} /> Escaneie com o app do seu banco
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-forest/10">
                <code className="flex-1 truncate rounded-xl bg-forest/[0.05] px-4 py-3 text-forest font-medium text-sm sm:text-base">
                  {config.pix_chave}
                </code>
                <Button
                  type="button"
                  onClick={copiarChave}
                  variant={copiado ? "secondary" : "primary"}
                  className="w-full sm:w-auto"
                >
                  {copiado ? <><Check size={18} /> Copiado!</> : <><Copy size={18} /> Copiar chave</>}
                </Button>
              </div>
              <p className="mt-3 text-xs text-ink/50">
                Chave Pix do tipo {config.pix_tipo || "e-mail"}, em nome da ONG Missão Vida.
              </p>
            </>
          ) : (
            <p className="mt-4 text-ink/60">
              Estamos atualizando nossos dados de doação via Pix. Enquanto isso, use o
              formulário abaixo para combinar sua contribuição diretamente conosco.
            </p>
          )}
        </div>
      </section>

      {/* Formulário de doação */}
      <section className="max-w-2xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-coral">Prefere combinar antes?</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest text-balance">
            Fale com a gente sobre sua doação
          </h2>
          <p className="mt-3 text-ink/70">
            Preencha o formulário abaixo para doações de itens, parcerias ou contribuições
            recorrentes. Nossa equipe entrará em contato.
          </p>
        </div>

        <form onSubmit={enviarFormulario} className="grid gap-5 rounded-3xl bg-white p-7 md:p-8 shadow-sm ring-1 ring-forest/5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-ink/80 mb-1.5">Nome completo</label>
              <input
                id="nome" name="nome" required value={form.nome} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-ink/80 mb-1.5">Telefone</label>
              <input
                id="telefone" name="telefone" value={form.telefone} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-1.5">E-mail</label>
            <input
              id="email" name="email" type="email" required value={form.email} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest"
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-ink/80 mb-1.5">Como você gostaria de ajudar?</label>
            <textarea
              id="mensagem" name="mensagem" required rows={4} value={form.mensagem} onChange={atualizarCampo}
              className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest resize-none"
              placeholder="Conte um pouco sobre como deseja contribuir..."
            />
          </div>

          <Button type="submit" variant="primary" className="justify-self-start" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar mensagem"}
          </Button>

          {status === "sucesso" && (
            <p className="text-sm font-medium text-forest">
              Mensagem enviada com sucesso! Em breve entraremos em contato. Obrigado pela generosidade. 💚
            </p>
          )}
          {status === "erro" && (
            <p className="text-sm font-medium text-coral-dark">
              Não foi possível enviar sua mensagem agora. Tente novamente em instantes.
            </p>
          )}
        </form>
      </section>
    </div>
  );
}
