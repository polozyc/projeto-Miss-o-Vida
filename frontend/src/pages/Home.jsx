import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartHandshake, Users, Trophy, Sparkles, ArrowRight,
  GraduationCap, HandHeart, CalendarHeart, Award, Package
} from "lucide-react";
import Button from "../components/Button";
import ImpactCounter from "../components/ImpactCounter";
import ProjectCard from "../components/ProjectCard";
import WaveDivider from "../components/WaveDivider";
import api from "../api/api";
import { useConfig } from "../context/ConfigContext";

// ONG fundada em 14/10/2013 (conforme Estatuto Social) — calcula "há quantos
// anos" automaticamente, sem precisar atualizar esse número todo ano.
const FUNDACAO = new Date("2013-10-14");
function calcularAnosAtuacao() {
  const diffMs = Date.now() - FUNDACAO.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
}

const ICONE_POR_CATEGORIA = {
  esporte: { icon: Trophy, tag: "Esporte" },
  educacao: { icon: GraduationCap, tag: "Educação" },
  social: { icon: HandHeart, tag: "Solidariedade" },
  evento: { icon: CalendarHeart, tag: "Comunidade" }
};

export default function Home() {
  const { config } = useConfig();
  const [galeria, setGaleria] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [erroApi, setErroApi] = useState(false);
  const anosAtuacao = calcularAnosAtuacao();

  useEffect(() => {
    api.get("/galeria").then((res) => setGaleria(res.data.slice(0, 8))).catch(() => setErroApi(true));
    api.get("/noticias").then((res) => setNoticias(res.data.slice(0, 3))).catch(() => setErroApi(true));
    api.get("/projetos").then((res) => setProjetos(res.data)).catch(() => setErroApi(true));
  }, []);

  // Pega o primeiro projeto cadastrado de cada categoria, pra mostrar um "resumo"
  // de 4 cards na Home (a lista completa fica na página Projetos).
  const destaquesProjetos = Object.entries(ICONE_POR_CATEGORIA)
    .map(([categoria, { icon, tag }]) => {
      const item = projetos.find((p) => p.categoria === categoria);
      return item ? { item, icon, tag } : null;
    })
    .filter(Boolean);

  return (
    <div>
      {/* Banner principal */}
      <section className="relative overflow-hidden bg-forest">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1600&q=70')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest/85 to-forest" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-28 md:pt-28 md:pb-36 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-marigold-light animate-fadeUp">
            <Sparkles size={16} /> Transformando Carapicuíba desde a nossa fundação
          </span>

          <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white text-balance leading-[1.1] animate-fadeUp [animation-delay:100ms]">
            Onde existe esperança,<br className="hidden md:block" /> a{" "}
            <span className="text-marigold">vida</span> encontra um caminho.
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg text-cream/80 animate-fadeUp [animation-delay:200ms]">
            A Missão Vida acredita que esporte, educação e solidariedade têm o poder
            de mudar histórias. Junte-se a nós nessa missão em Carapicuíba - SP.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4 animate-fadeUp [animation-delay:300ms]">
            <Button to="/doacoes" variant="primary" className="shadow-lg shadow-coral/30">
              Quero ajudar <HeartHandshake size={18} />
            </Button>
            <Button to="/projetos" variant="ghost">
              Conhecer os projetos <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        <WaveDivider />
      </section>

      {/* Missão */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-coral">
            Nossa missão
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-forest text-balance">
            Cuidar de pessoas é o nosso propósito, todos os dias.
          </h2>
          <p className="mt-5 text-ink/70 leading-relaxed">
            Somos uma organização não governamental dedicada ao apoio comunitário e à
            inclusão social em Carapicuíba. Por meio de atividades esportivas, ações
            beneficentes e projetos educacionais, oferecemos oportunidades reais de
            desenvolvimento para crianças, jovens e famílias em situação de vulnerabilidade.
          </p>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Acreditamos que cada pessoa atendida carrega consigo o potencial de
            transformar sua própria comunidade — e é isso que nos move.
          </p>
          <Button to="/sobre" variant="outline" className="mt-7">
            Conheça nossa história
          </Button>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&q=80"
              alt="Voluntários da Missão Vida em ação comunitária"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-marigold/20 text-marigold-dark">
              <HandHeart size={22} />
            </span>
            <div>
              <p className="font-display font-semibold text-forest leading-none">Comunidade</p>
              <p className="text-xs text-ink/60">unida por um propósito</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section className="bg-forest/[0.03] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-widest text-coral">
              O que fazemos
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-forest text-balance">
              Projetos sociais que mudam realidades
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destaquesProjetos.map(({ item, icon, tag }) => (
              <ProjectCard
                key={item.id}
                icon={icon}
                tag={tag}
                titulo={item.titulo}
                descricao={item.descricao}
                imagem={item.imagem_url}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button to="/projetos" variant="secondary">
              Ver todos os projetos <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Selos de credibilidade + Números / Impacto */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-coral">
            Nosso impacto
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-forest text-balance">
            Cada número representa uma vida transformada
          </h2>
        </div>

        {/* Selos */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 mb-14">
          <div className="flex items-center gap-3 justify-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink/60">
              <Award size={20} />
            </span>
            <span className="font-medium text-forest">Reconhecimento da comunidade</span>
          </div>
          <div className="flex items-center gap-3 justify-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-marigold/20 text-marigold-dark">
              <Users size={20} />
            </span>
            <span className="font-medium text-forest">
              Atuamos há mais de {anosAtuacao} anos impactando vidas
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <ImpactCounter icon={Users} valorTexto={config.impacto_pessoas} label="pessoas atendidas diretamente" />
          <ImpactCounter icon={Package} valorTexto={config.impacto_cestas} label="cestas básicas distribuídas" />
          <ImpactCounter icon={Trophy} valorTexto={config.impacto_criancas} label="crianças e adolescentes em projetos esportivos" />
        </div>

        <div className="text-center mt-14">
          <Button to="/doacoes" variant="primary">
            Seja voluntário <HeartHandshake size={18} />
          </Button>
        </div>
      </section>

      {/* Últimas notícias (dados reais da API) */}
      {noticias.length > 0 && (
        <section className="bg-forest/[0.03] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-coral">
                Fique por dentro
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-forest text-balance">
                Últimas notícias
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {noticias.map((n) => (
                <article
                  key={n.id}
                  className="rounded-3xl bg-white overflow-hidden shadow-sm ring-1 ring-forest/5 hover:shadow-lg transition-shadow"
                >
                  {n.imagem_url && (
                    <img src={n.imagem_url} alt={n.titulo} className="h-44 w-full object-cover" loading="lazy" />
                  )}
                  <div className="p-6">
                    <p className="text-xs text-ink/50 mb-2">
                      {new Date(n.criado_em).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                    </p>
                    <h3 className="font-display text-lg font-semibold text-forest mb-2">{n.titulo}</h3>
                    <p className="text-sm text-ink/70 line-clamp-3">{n.resumo}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Galeria de fotos */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-coral">
            Registros do nosso trabalho
          </span>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-forest text-balance">
            Galeria de fotos
          </h2>
        </div>

        {galeria.length > 0 ? (
          <div className="columns-2 md:columns-4 gap-4 space-y-4">
            {galeria.map((foto) => (
              <img
                key={foto.id}
                src={foto.imagem_url}
                alt={foto.titulo || "Foto da ONG Missão Vida"}
                loading="lazy"
                className="w-full rounded-2xl break-inside-avoid shadow-sm hover:shadow-lg transition-shadow"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50">
            {erroApi ? "Não foi possível carregar a galeria no momento." : "Carregando galeria..."}
          </p>
        )}
      </section>

      {/* CTA final */}
      <section className="bg-forest py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white text-balance">
            Sua ajuda pode escrever o próximo capítulo dessa história.
          </h2>
          <p className="mt-4 text-cream/70">
            Seja com doações, tempo voluntário ou parcerias, toda contribuição importa.
          </p>
          <Button to="/doacoes" variant="primary" className="mt-8">
            Quero ajudar agora <HeartHandshake size={18} />
          </Button>
        </div>
      </section>
    </div>
  );
}
