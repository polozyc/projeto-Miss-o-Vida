import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import WaveDivider from "../components/WaveDivider";
import Button from "../components/Button";
import api from "../api/api";

export default function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [enviando, setEnviando] = useState(false);
  const [status, setStatus] = useState(null);

  function atualizarCampo(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function enviarFormulario(e) {
    e.preventDefault();
    setEnviando(true);
    setStatus(null);
    try {
      await api.post("/mensagens", { ...form, assunto: "contato" });
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
            Fale conosco
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold text-white text-balance">
            Estamos aqui para ouvir você
          </h1>
          <p className="mt-5 text-cream/80">
            Dúvidas, sugestões ou vontade de fazer parte da nossa missão? Entre em contato.
          </p>
        </div>
        <WaveDivider />
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20 grid lg:grid-cols-5 gap-10">
        {/* Informações de contato */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-forest/5 space-y-5">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                <MapPin size={20} />
              </span>
              <div>
                <h3 className="font-display font-semibold text-forest">Endereço</h3>
                <p className="text-sm text-ink/70">Rua Albino de Moraes, 60 - Vila Caldas, Carapicuíba - SP</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-marigold/20 text-marigold-dark">
                <Phone size={20} />
              </span>
              <div>
                <h3 className="font-display font-semibold text-forest">Telefone</h3>
                <p className="text-sm text-ink/70">(11) 4187-0000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-coral/10 text-coral">
                <Mail size={20} />
              </span>
              <div>
                <h3 className="font-display font-semibold text-forest">E-mail</h3>
                <p className="text-sm text-ink/70">contato@missaovida.org.br</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest/10 text-forest">
                <Clock size={20} />
              </span>
              <div>
                <h3 className="font-display font-semibold text-forest">Horário de atendimento</h3>
                <p className="text-sm text-ink/70">Segunda a sexta, das 9h às 17h</p>
              </div>
            </div>
          </div>

          {/* Mapa integrado */}
          <div className="rounded-3xl overflow-hidden shadow-sm ring-1 ring-forest/5 h-72">
            <iframe
              title="Mapa da sede da ONG Missão Vida"
              src="https://www.google.com/maps?q=Rua+Albino+de+Moraes,+60,+Vila+Caldas,+Carapicu%C3%ADba+-+SP&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Formulário */}
        <div className="lg:col-span-3">
          <form onSubmit={enviarFormulario} className="grid gap-5 rounded-3xl bg-white p-7 md:p-8 shadow-sm ring-1 ring-forest/5">
            <h2 className="font-display text-2xl font-semibold text-forest">Envie uma mensagem</h2>
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
                <label htmlFor="telefone" className="block text-sm font-medium text-ink/80 mb-1.5">Telefone (opcional)</label>
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
              <label htmlFor="mensagem" className="block text-sm font-medium text-ink/80 mb-1.5">Mensagem</label>
              <textarea
                id="mensagem" name="mensagem" required rows={5} value={form.mensagem} onChange={atualizarCampo}
                className="w-full rounded-xl border border-forest/15 px-4 py-3 outline-none focus:border-forest resize-none"
                placeholder="Escreva sua mensagem..."
              />
            </div>
            <Button type="submit" variant="primary" className="justify-self-start" disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar mensagem"}
            </Button>

            {status === "sucesso" && (
              <p className="text-sm font-medium text-forest">
                Mensagem enviada com sucesso! Retornaremos o contato em breve.
              </p>
            )}
            {status === "erro" && (
              <p className="text-sm font-medium text-coral-dark">
                Não foi possível enviar sua mensagem agora. Tente novamente em instantes.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
