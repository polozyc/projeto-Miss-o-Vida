import React from "react";
import { Target, Eye, Gem, Sprout } from "lucide-react";
import WaveDivider from "../components/WaveDivider";

const valores = [
  { titulo: "Respeito", descricao: "Acolhemos cada pessoa como ela é, sem julgamentos." },
  { titulo: "Transparência", descricao: "Prestamos contas à comunidade e aos apoiadores com clareza." },
  { titulo: "Solidariedade", descricao: "Acreditamos na força coletiva para transformar realidades." },
  { titulo: "Compromisso", descricao: "Trabalhamos com constância para gerar impacto de longo prazo." }
];

export default function Sobre() {
  return (
    <div>
      {/* Cabeçalho */}
      <section className="bg-forest pt-16 pb-24 md:pt-24 md:pb-32 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-marigold-light">
            <Sprout size={16} /> Nossa história
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold text-white text-balance">
            Uma missão que nasceu do desejo de servir
          </h1>
          <p className="mt-5 text-cream/80">
            Conheça a trajetória, os valores e o propósito que guiam a ONG Missão Vida
            em Carapicuíba - SP.
          </p>
        </div>
        <WaveDivider />
      </section>

      {/* História */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=700&q=80"
              alt="Grupo de voluntários da Missão Vida reunidos"
              className="rounded-3xl shadow-lg w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-3">
            <span className="text-sm font-semibold uppercase tracking-widest text-coral">Como tudo começou</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-forest">Nossa história</h2>
            <p className="mt-5 text-ink/70 leading-relaxed">
              A Missão Vida nasceu do desejo de um pequeno grupo de moradores de Carapicuíba
              de oferecer, aos finais de semana, atividades esportivas gratuitas para as
              crianças do bairro Vila Caldas. O que começou com uma bola de futebol e um
              terreno emprestado se transformou, ao longo dos anos, em uma organização
              estruturada que atende centenas de famílias todos os meses.
            </p>
            <p className="mt-4 text-ink/70 leading-relaxed">
              Hoje, contamos com uma rede de voluntários, parceiros locais e apoiadores que
              acreditam, assim como nós, que a transformação social começa quando a
              comunidade se une por um propósito comum: cuidar de quem precisa.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="bg-forest/[0.03] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-forest/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10 text-forest mb-4">
                <Target size={24} />
              </span>
              <h3 className="font-display text-xl font-semibold text-forest mb-2">Missão</h3>
              <p className="text-ink/70 leading-relaxed">
                Promover a inclusão social e o desenvolvimento humano de crianças, jovens e
                famílias de Carapicuíba por meio do esporte, da educação e de ações
                solidárias.
              </p>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-forest/5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest/10 text-forest mb-4">
                <Eye size={24} />
              </span>
              <h3 className="font-display text-xl font-semibold text-forest mb-2">Visão</h3>
              <p className="text-ink/70 leading-relaxed">
                Ser reconhecida como uma referência regional em transformação social,
                ampliando cada vez mais o número de vidas impactadas em nossa comunidade.
              </p>
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-marigold/20 text-marigold-dark mb-4">
              <Gem size={24} />
            </span>
            <h3 className="font-display text-2xl font-semibold text-forest">Nossos valores</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((v) => (
              <div key={v.titulo} className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-forest/5">
                <h4 className="font-display font-semibold text-forest mb-2">{v.titulo}</h4>
                <p className="text-sm text-ink/70">{v.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explicação dos projetos */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-coral">Nossa atuação</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-forest text-balance">
            Como colocamos nossa missão em prática
          </h2>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-forest/[0.04] p-6">
            <h3 className="font-display font-semibold text-forest sm:w-48 shrink-0">Área esportiva</h3>
            <p className="text-ink/70">
              Oficinas gratuitas de futebol, vôlei e capoeira, com foco em disciplina, saúde
              e convivência em grupo para crianças e adolescentes de 6 a 17 anos.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-forest/[0.04] p-6">
            <h3 className="font-display font-semibold text-forest sm:w-48 shrink-0">Ações sociais</h3>
            <p className="text-ink/70">
              Campanhas de arrecadação, distribuição de cestas básicas e mutirões de
              cidadania para famílias em situação de vulnerabilidade social.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 rounded-2xl bg-forest/[0.04] p-6">
            <h3 className="font-display font-semibold text-forest sm:w-48 shrink-0">Eventos comunitários</h3>
            <p className="text-ink/70">
              Encontros abertos à comunidade que celebram conquistas, fortalecem vínculos e
              aproximam voluntários, famílias e parceiros da ONG.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
