import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Em produção no GitHub Pages, o site fica em algo como
// https://usuario.github.io/nome-do-repo/ — ou seja, não na raiz do domínio.
// A variável VITE_BASE_PATH (definida pelo workflow do GitHub Actions)
// ajusta o "base" do Vite para esse caso. Em Docker/local, continua "/".
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  preview: {
    host: true,
    port: 5173
  }
});
