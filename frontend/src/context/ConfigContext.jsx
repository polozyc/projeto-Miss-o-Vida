import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

// Valores padrão exibidos enquanto a API carrega (ou caso ela falhe),
// para o site nunca ficar com campos em branco.
const PADRAO = {
  telefone: "(11) 4187-0000",
  email: "contato@missaovida.org.br",
  endereco: "Rua Albino de Moraes, 60 - Vila Caldas, Carapicuíba - SP",
  horario_atendimento: "Segunda a sexta, das 9h às 17h",
  pix_chave: "",
  pix_tipo: "email",
  pix_qrcode_url: "",
  instagram_url: "https://instagram.com",
  facebook_url: "https://facebook.com",
  impacto_pessoas: "5MIL",
  impacto_cestas: "1200MIL",
  impacto_criancas: "200"
};

const ConfigContext = createContext(null);

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(PADRAO);
  const [carregando, setCarregando] = useState(true);

  async function recarregarConfig() {
    try {
      const { data } = await api.get("/configuracoes");
      setConfig({ ...PADRAO, ...data });
    } catch (err) {
      // Mantém os valores padrão se a API estiver fora do ar
      console.error("Não foi possível carregar as configurações:", err.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    recarregarConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, carregandoConfig: carregando, recarregarConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useConfig deve ser usado dentro de um ConfigProvider");
  return ctx;
}
