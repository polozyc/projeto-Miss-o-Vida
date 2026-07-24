import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Image, Newspaper, MessageSquare, LogOut, HeartHandshake
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard, end: true },
  { to: "/admin/galeria", label: "Galeria", icon: Image },
  { to: "/admin/noticias", label: "Notícias", icon: Newspaper },
  { to: "/admin/mensagens", label: "Mensagens", icon: MessageSquare }
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-forest/[0.03]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col bg-forest text-cream/90 p-6">
        <div className="flex items-center gap-2 mb-10">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold text-forest-dark">
            <HeartHandshake size={20} />
          </span>
          <span className="font-display text-lg font-semibold text-white">Missão Vida</span>
        </div>

        <nav className="flex-1 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? "bg-white/10 text-marigold-light" : "text-cream/70 hover:bg-white/5"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-cream/50 mb-3 truncate">{admin?.email}</p>
          <button
            onClick={sair}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-cream/70 hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar mobile */}
        <div className="md:hidden flex items-center justify-between bg-forest text-white px-5 py-4">
          <span className="font-display font-semibold">Painel Missão Vida</span>
          <button onClick={sair} className="text-sm underline">Sair</button>
        </div>
        <div className="md:hidden flex gap-2 overflow-x-auto px-5 py-3 bg-forest-dark">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium ${
                  isActive ? "bg-marigold text-forest-dark" : "bg-white/10 text-cream/70"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <main className="flex-1 p-5 md:p-10">{children}</main>
      </div>
    </div>
  );
}
