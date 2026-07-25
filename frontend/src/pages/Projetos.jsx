import React, { useEffect, useState } from "react";
import { Trophy, HandHeart, CalendarHeart, GraduationCap } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import WaveDivider from "../components/WaveDivider";
import Button from "../components/Button";
import api from "../api/api";

const CATEGORIAS = [
  { chave: "esporte", titulo: "Área Esportiva", icon: Trophy, corIcone: "bg-forest/10 text-forest" },
  { chave: "educacao", titulo: "Educação", icon: GraduationCap, corIcone: "bg-forest/10 text-forest" },
  { chave: "social", titulo: "Ações Sociais", icon: HandHeart, corIcone: "bg-marigold/20 text-marigold-dark" },
  { chave: "evento", titulo: "Eventos Comunitários", icon: CalendarHeart, corIcone: "bg-coral/10 text-coral" }
];

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api
      .get("/projetos")
      .then((res) => setProjetos(res.data))
      .catch(() => setProjetos([]))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div>
      <section className="bg-forest pt-16 pb-24 md:pt-24 md:pb-32 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-marigold-light">
            Nossos projetos
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold text-white text-balance">
            Iniciativas que transformam Carapicuíba
          </h1>
          <p className="mt-5 text-cream/80">
            Conheça em detalhes as frentes de atuação da Missão Vida: esporte, educação,
            ação social e eventos comunitários.
          </p>
        </div>
        <WaveDivider />
      </section>

      {carregando && (
        <p className="text-center text-ink/50 py-16">Carregando projetos...</p>
      )}

      {!carregando && projetos.length === 0 && (
        <p className="text-center text-ink/50 py-16">
          Nenhum projeto cadastrado no momento.
        </p>
      )}

      {CATEGORIAS.map(({ chave, titulo, icon: Icon, corIcone }, index) => {
        const itensCategoria = projetos.filter((p) => p.categoria === chave);
        if (itensCategoria.length === 0) return null;

        return (
          <section
            key={chave}
            className={index % 2 === 1 ? "bg-forest/[0.03] py-16 md:py-20" : "max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20"}
          >
            <div className={index % 2 === 1 ? "max-w-7xl mx-auto px-5 md:px-8" : ""}>
              <div className="flex items-center gap-3 mb-8">
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${corIcone}`}>
                  <Icon size={22} />
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest">{titulo}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {itensCategoria.map((p) => (
                  <ProjectCard
                    key={p.id}
                    icon={Icon}
                    tag={p.tag}
                    titulo={p.titulo}
                    descricao={p.descricao}
                    imagem={p.imagem_url}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-forest py-16 text-center">
        <div className="max-w-2xl mx-auto px-5">
          <h2 className="font-display text-3xl font-semibold text-white text-balance">
            Quer apoiar algum desses projetos?
          </h2>
          <p className="mt-4 text-cream/70">
            Sua doação ou seu tempo voluntário ajudam a manter essas iniciativas vivas.
          </p>
          <Button to="/doacoes" variant="primary" className="mt-8">
            Quero ajudar
          </Button>
        </div>
      </section>
    </div>
  );
}
