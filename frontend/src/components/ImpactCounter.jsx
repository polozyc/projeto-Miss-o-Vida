import React, { useEffect, useRef, useState } from "react";

/**
 * Contador animado que sobe até o valor alvo quando entra na tela.
 * O anel de "ripple" ao redor do ícone é o elemento de assinatura visual
 * da seção de impacto, remetendo à ideia de uma ação se espalhando pela comunidade.
 */
export default function ImpactCounter({ icon: Icon, valor, label, sufixo = "+" }) {
  const [contagem, setContagem] = useState(0);
  const ref = useRef(null);
  const jaAnimou = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !jaAnimou.current) {
          jaAnimou.current = true;
          const duracao = 1500;
          const inicio = performance.now();

          function passo(agora) {
            const progresso = Math.min((agora - inicio) / duracao, 1);
            const facilitado = 1 - Math.pow(1 - progresso, 3);
            setContagem(Math.floor(facilitado * valor));
            if (progresso < 1) requestAnimationFrame(passo);
          }
          requestAnimationFrame(passo);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [valor]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-3">
      <div className="relative flex items-center justify-center h-16 w-16">
        <span className="absolute inset-0 rounded-full bg-marigold/30 animate-ripple" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-forest text-marigold-light">
          <Icon size={26} strokeWidth={2} />
        </span>
      </div>
      <p className="font-display text-4xl md:text-5xl font-semibold text-forest">
        {contagem.toLocaleString("pt-BR")}
        <span className="text-marigold">{sufixo}</span>
      </p>
      <p className="text-ink/70 font-medium max-w-[14ch]">{label}</p>
    </div>
  );
}
