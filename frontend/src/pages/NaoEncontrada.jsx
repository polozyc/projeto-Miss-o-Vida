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
    </div>
  );
}
