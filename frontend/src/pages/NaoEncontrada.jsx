import React from "react";
import { Compass } from "lucide-react";
import Button from "../components/Button";

export default function NaoEncontrada() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-5">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest mb-6">
        <Compass size={28} />
      </span>
      <h1 className="font-display text-3xl font-semibold text-forest">Página não encontrada</h1>
      <p className="mt-3 text-ink/60 max-w-md">
        O endereço que você tentou acessar não existe ou foi movido.
      </p>
      <Button to="/" variant="secondary" className="mt-8">
        Voltar para a página inicial
      </Button>

      {/* DIAGNÓSTICO TEMPORÁRIO - remover depois de resolver o roteamento */}
      <div className="mt-10 rounded-xl bg-black/5 p-4 text-left text-xs font-mono text-ink/70 max-w-lg break-all">
        <p><strong>BASE_URL:</strong> {String(import.meta.env.BASE_URL)}</p>
        <p><strong>window.location.pathname:</strong> {window.location.pathname}</p>
        <p><strong>window.location.href:</strong> {window.location.href}</p>
      </div>
    </div>
  );
}
