import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api"
});

// Anexa automaticamente o token JWT (se existir) em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("missaovida_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Prefixo do site (ex: "/nome-do-repo" no GitHub Pages, ou "" em Docker/local)
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

// Redireciona para o login caso o token expire/seja inválido
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const caminhoAdmin = `${base}/admin`;
    const caminhoLogin = `${base}/admin/login`;
    if (error.response?.status === 401 && window.location.pathname.startsWith(caminhoAdmin)) {
      localStorage.removeItem("missaovida_token");
      localStorage.removeItem("missaovida_admin");
      if (window.location.pathname !== caminhoLogin) {
        window.location.href = caminhoLogin;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
