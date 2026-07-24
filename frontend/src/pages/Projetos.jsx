import React from "react";
import { Trophy, HandHeart, CalendarHeart, Dumbbell, Users2, ShieldCheck } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import WaveDivider from "../components/WaveDivider";
import Button from "../components/Button";

export default function Projetos() {
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
            Conheça em detalhes as frentes de atuação da Missão Vida: esporte, ação social
            e eventos comunitários.
          </p>
        </div>
        <WaveDivider />
      </section>

      {/* Área esportiva */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest/10 text-forest">
            <Trophy size={22} />
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest">Área Esportiva</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            icon={Trophy}
            tag="6 a 12 anos"
            titulo="Futebol de Base"
            descricao="Treinos semanais aos sábados, com foco em fundamentos, trabalho em equipe e valores esportivos."
            imagem="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
          />
          <ProjectCard
            icon={Dumbbell}
            tag="13 a 17 anos"
            titulo="Vôlei Comunitário"
            descricao="Oficinas de vôlei que aliam atividade física a rodas de conversa sobre saúde e cidadania."
            imagem="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80"
          />
          <ProjectCard
            icon={Users2}
            tag="Todas as idades"
            titulo="Capoeira e Cultura"
            descricao="Aulas de capoeira que resgatam a cultura afro-brasileira e fortalecem a autoestima dos participantes."
            imagem="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80"
          />
        </div>
      </section>

      {/* Ações sociais */}
      <section className="bg-forest/[0.03] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-marigold/20 text-marigold-dark">
              <HandHeart size={22} />
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest">Ações Sociais</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              icon={HandHeart}
              tag="Mensal"
              titulo="Cesta Solidária"
              descricao="Distribuição mensal de cestas básicas para famílias cadastradas em situação de vulnerabilidade."
              imagem="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80"
            />
            <ProjectCard
              icon={ShieldCheck}
              tag="Sazonal"
              titulo="Campanha do Agasalho"
              descricao="Arrecadação e distribuição de roupas e cobertores durante os meses mais frios do ano."
              imagem="https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&q=80"
            />
            <ProjectCard
              icon={Users2}
              tag="Bimestral"
              titulo="Mutirão de Cidadania"
              descricao="Emissão de documentos, orientação jurídica e serviços básicos de saúde para a comunidade."
              imagem="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80"
            />
          </div>
        </div>
      </section>

      {/* Eventos comunitários */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-coral/10 text-coral">
            <CalendarHeart size={22} />
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-forest">Eventos Comunitários</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            icon={CalendarHeart}
            tag="Anual"
            titulo="Festa das Crianças"
            descricao="Celebração especial no Dia das Crianças com brincadeiras, lanches e presentes para os pequenos."
            imagem="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80"
          />
          <ProjectCard
            icon={Users2}
            tag="Semestral"
            titulo="Encontro de Famílias"
            descricao="Tarde de integração entre voluntários, famílias atendidas e parceiros da comunidade."
            imagem="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&q=80"
          />
          <ProjectCard
            icon={CalendarHeart}
            tag="Anual"
            titulo="Confraternização de Fim de Ano"
            descricao="Celebração de encerramento das atividades do ano, com apresentações dos participantes dos projetos."
            imagem="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80"
          />
        </div>
      </section>

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
