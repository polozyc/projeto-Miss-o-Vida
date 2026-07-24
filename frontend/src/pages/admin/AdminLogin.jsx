import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, HeartHandshake } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function aoSubmeter(e) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      await login(email, senha);
      navigate("/admin");
    } catch (err) {
      setErro(err.response?.data?.erro || "Não foi possível entrar. Verifique suas credenciais.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center bg-forest px-5 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 md:p-10 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-marigold-light mb-4">
            <HeartHandshake size={26} />
          </span>
          <h1 className="font-display text-2xl font-semibold text-forest">Painel Administrativo</h1>
          <p className="text-sm text-ink/60 mt-1">ONG Missão Vida</p>
        </div>

        <form onSubmit={aoSubmeter} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-1.5">E-mail</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-forest/15 pl-11 pr-4 py-3 outline-none focus:border-forest"
                placeholder="admin@missaovida.org.br"
              />
            </div>
          </div>
          <div>
            <label htmlFor="senha" className="block text-sm font-medium text-ink/80 mb-1.5">Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
              <input
                id="senha"
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-xl border border-forest/15 pl-11 pr-4 py-3 outline-none focus:border-forest"
                placeholder="••••••••"
              />
            </div>
          </div>

          {erro && <p className="text-sm font-medium text-coral-dark">{erro}</p>}

          <Button type="submit" variant="secondary" className="w-full" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink/40">
          Acesso restrito à equipe e voluntários autorizados da ONG.
        </p>
      </div>
    </div>
  );
}
