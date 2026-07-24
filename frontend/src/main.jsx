import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./index.css";

// Em produção no GitHub Pages, o site fica publicado numa subpasta
// (ex: https://usuario.github.io/nome-do-repo/), definida pelo "base" do Vite.
// O React Router precisa saber disso via "basename", senão os links internos
// (e o F5/reload) acabam apontando para a raiz do domínio, gerando 404.
// Em Docker/local, import.meta.env.BASE_URL é "/" e o basename vira "" (sem efeito).
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

