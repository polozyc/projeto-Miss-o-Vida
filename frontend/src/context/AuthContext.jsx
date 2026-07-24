import React, { createContext, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const armazenado = localStorage.getItem("missaovida_admin");
    return armazenado ? JSON.parse(armazenado) : null;
  });

  async function login(email, senha) {
    const { data } = await api.post("/auth/login", { email, senha });
    localStorage.setItem("missaovida_token", data.token);
    localStorage.setItem("missaovida_admin", JSON.stringify(data.admin));
    setAdmin(data.admin);
    return data.admin;
  }

  function logout() {
    localStorage.removeItem("missaovida_token");
    localStorage.removeItem("missaovida_admin");
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, autenticado: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return ctx;
}
