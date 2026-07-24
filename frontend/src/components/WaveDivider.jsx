import React from "react";

/**
 * Divisor orgânico em formato de onda, usado entre seções para reforçar
 * a identidade visual "orgânica" da marca (crescimento, vida, movimento),
 * em vez de simples linhas retas.
 */
export default function WaveDivider({ flip = false, color = "#FBF7EF" }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 80" className="w-full h-16 md:h-20" preserveAspectRatio="none">
        <path
          d="M0,32 C200,80 400,0 600,24 C800,48 1000,8 1200,40 L1200,80 L0,80 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
