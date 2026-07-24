import React from "react";

export default function ProjectCard({ icon: Icon, titulo, descricao, tag, imagem }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-forest/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      {imagem && (
        <div className="h-44 w-full overflow-hidden">
          <img
            src={imagem}
            alt={titulo}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest/10 text-forest">
            <Icon size={22} strokeWidth={2} />
          </span>
          {tag && (
            <span className="rounded-full bg-marigold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-marigold-dark">
              {tag}
            </span>
          )}
        </div>
        <h3 className="font-display text-xl font-semibold text-forest">{titulo}</h3>
        <p className="text-sm leading-relaxed text-ink/70">{descricao}</p>
      </div>
    </div>
  );
}
