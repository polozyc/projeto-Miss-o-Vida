import React from "react";
import { Link } from "react-router-dom";
import { HeartHandshake, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-forest-dark text-cream/90">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold text-forest-dark">
              <HeartHandshake size={20} strokeWidth={2.2} />
            </span>
            <span className="font-display text-lg font-semibold text-white">Missão Vida</span>
          </div>
          <p className="text-sm text-cream/70 leading-relaxed">
            Transformando vidas através do esporte, da educação e da solidariedade
            em Carapicuíba - SP desde a nossa fundação.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Missão Vida"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-marigold hover:text-forest-dark transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da Missão Vida"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-marigold hover:text-forest-dark transition-colors"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-white mb-4">Navegação</h3>
          <ul className="space-y-2 text-sm text-cream/70">
            <li><Link to="/" className="hover:text-marigold transition-colors">Início</Link></li>
            <li><Link to="/sobre" className="hover:text-marigold transition-colors">Sobre nós</Link></li>
            <li><Link to="/projetos" className="hover:text-marigold transition-colors">Projetos sociais</Link></li>
            <li><Link to="/doacoes" className="hover:text-marigold transition-colors">Como doar</Link></li>
            <li><Link to="/contato" className="hover:text-marigold transition-colors">Fale conosco</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-white mb-4">Contato</h3>
          <ul className="space-y-3 text-sm text-cream/70">
            <li className="flex items-start gap-2">
              <MapPin size={17} className="mt-0.5 shrink-0 text-marigold" />
              <span>Rua Albino de Moraes, 60 - Vila Caldas, Carapicuíba - SP</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={17} className="shrink-0 text-marigold" />
              <span>(11) 4187-0000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={17} className="shrink-0 text-marigold" />
              <span>contato@missaovida.org.br</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-white mb-4">Administração</h3>
          <p className="text-sm text-cream/70 mb-3">
            Área restrita para colaboradores e voluntários da ONG.
          </p>
          <Link
            to="/admin/login"
            className="inline-flex items-center rounded-full border border-cream/30 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Acessar painel
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 text-xs text-cream/50 flex flex-col md:flex-row justify-between gap-2">
          <p>© {ano} ONG Missão Vida - Carapicuíba, SP. Todos os direitos reservados.</p>
          <p>Projeto desenvolvido em atividade de extensão universitária.</p>
        </div>
      </div>
    </footer>
  );
}
