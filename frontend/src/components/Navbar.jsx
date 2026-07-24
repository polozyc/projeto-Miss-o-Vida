import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, HeartHandshake } from "lucide-react";

const links = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/projetos", label: "Projetos" },
  { to: "/doacoes", label: "Doações" },
  { to: "/contato", label: "Contato" }
];

export default function Navbar() {
  const [aberto, setAberto] = useState(false);
  const [rolado, setRolado] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function aoRolar() {
      setRolado(window.scrollY > 12);
    }
    window.addEventListener("scroll", aoRolar);
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    setAberto(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        rolado ? "bg-cream/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-marigold-light group-hover:bg-forest-dark transition-colors">
            <HeartHandshake size={20} strokeWidth={2.2} />
          </span>
          <span className="font-display text-xl font-semibold text-forest leading-none">
            Missão Vida
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-ink/80">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative py-1 transition-colors hover:text-forest ${
                    isActive ? "text-forest font-semibold" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-marigold" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link
          to="/doacoes"
          className="hidden md:inline-flex items-center rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-coral-dark"
        >
          Quero ajudar
        </Link>

        {/* Botão menu mobile */}
        <button
          className="md:hidden text-forest"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
        >
          {aberto ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menu mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          aberto ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 pb-5 bg-cream/95 backdrop-blur-md">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                onClick={() => setAberto(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-3 font-medium ${
                    isActive ? "bg-forest/10 text-forest" : "text-ink/80"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="pt-2">
            <Link
              to="/doacoes"
              onClick={() => setAberto(false)}
              className="block rounded-full bg-coral px-4 py-3 text-center font-semibold text-white"
            >
              Quero ajudar
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
