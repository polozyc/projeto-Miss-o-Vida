import React, { useEffect, useState } from "react";
import { ShieldCheck, FileText, Download, Eye, BadgeCheck, Flame, ScrollText } from "lucide-react";
import WaveDivider from "../components/WaveDivider";
import api from "../api/api";
import { resolverUrlArquivo } from "../utils/url";

const ICONE_POR_CATEGORIA = {
  regularidade: { icon: BadgeCheck, cor: "bg-forest/10 text-forest" },
  registro: { icon: ShieldCheck, cor: "bg-marigold/20 text-marigold-dark" },
  licenca: { icon: Flame, cor: "bg-coral/10 text-coral" },
  estatutario: { icon: ScrollText, cor: "bg-forest/10 text-forest" },
  documento: { icon: FileText, cor: "bg-forest/10 text-forest" }
};

export default function Certificados() {
  const [certificados, setCertificados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    api
      .get("/certificados")
      .then((res) => setCertificados(res.data))
      .catch(() => setErro(true))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <div>
      <section className="bg-forest pt-16 pb-24 md:pt-24 md:pb-32 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-marigold-light">
            <ShieldCheck size={16} /> Transparência
          </span>
          <h1 className="mt-6 font-display text-4xl md:text-5xl font-semibold text-white text-balance">
            Certificados e Documentos
          </h1>
          <p className="mt-5 text-cream/80">
            A Missão Vida atua com regularidade e transparência. Aqui você pode consultar
            nossos certificados, registros e documentos institucionais.
          </p>
        </div>
        <WaveDivider />
      </section>

      <section className="max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
        {carregando && (
          <p className="text-center text-ink/50 py-10">Carregando documentos...</p>
        )}

        {!carregando && erro && (
          <p className="text-center text-ink/50 py-10">
            Não foi possível carregar os documentos no momento.
          </p>
        )}

        {!carregando && !erro && certificados.length === 0 && (
          <p className="text-center text-ink/50 py-10">
            Nenhum documento cadastrado no momento.
          </p>
        )}

        <div className="grid gap-5">
          {certificados.map((c) => {
            const { icon: Icon, cor } = ICONE_POR_CATEGORIA[c.categoria] || ICONE_POR_CATEGORIA.documento;
            const url = resolverUrlArquivo(c.arquivo_url);

            return (
              <div
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest/5 hover:shadow-md transition-shadow"
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${cor}`}>
                  <Icon size={26} />
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold text-forest">{c.titulo}</h3>
                  {c.descricao && (
                    <p className="text-sm text-ink/70 mt-1">{c.descricao}</p>
                  )}
                  {c.data_referencia && (
                    <p className="text-xs text-ink/50 mt-1.5">{c.data_referencia}</p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-forest/10 text-forest px-4 py-2 text-sm font-semibold hover:bg-forest/20 transition-colors"
                  >
                    <Eye size={16} /> Visualizar
                  </a>
                  <a
                    href={url}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-marigold/20 text-marigold-dark px-4 py-2 text-sm font-semibold hover:bg-marigold/30 transition-colors"
                  >
                    <Download size={16} /> Baixar
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
