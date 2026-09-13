require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

const pool = require("./config/database");
const seedAdmin = require("./config/seedAdmin");
const obterIpCliente = require("./utils/obterIpCliente");
const { errorMiddleware, notFoundMiddleware } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const mensagensRoutes = require("./routes/mensagensRoutes");
const noticiasRoutes = require("./routes/noticiasRoutes");
const galeriaRoutes = require("./routes/galeriaRoutes");
const projetosRoutes = require("./routes/projetosRoutes");
const certificadosRoutes = require("./routes/certificadosRoutes");
const configuracoesRoutes = require("./routes/configuracoesRoutes");

/**
 * Em produção, recusa subir com segredos/senhas padrão de exemplo —
 * evita repetir incidentes onde o .env de exemplo é copiado sem alterações
 * e o painel admin (que controla a chave Pix exibida no site) fica exposto.
 */
function validarSegredosDeProducao() {
  if (process.env.NODE_ENV !== "production") return;

  const problemas = [];
  const valoresProibidos = new Set([
    "troque_esta_chave_em_producao",
    "GERE_UM_SEGREDO_LONGO_E_ALEATORIO_AQUI"
  ]);

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32 || valoresProibidos.has(process.env.JWT_SECRET)) {
    problemas.push("JWT_SECRET ausente, curto demais (mín. 32 caracteres) ou igual ao valor de exemplo.");
  }
  if (
    process.env.ADMIN_DEFAULT_PASSWORD === "missaovida2026" ||
    process.env.ADMIN_DEFAULT_PASSWORD === "GERE_UMA_SENHA_FORTE_AQUI" ||
    !process.env.ADMIN_DEFAULT_PASSWORD ||
    process.env.ADMIN_DEFAULT_PASSWORD.length < 10
  ) {
    problemas.push("ADMIN_DEFAULT_PASSWORD ausente, curta demais ou igual ao valor padrão/exemplo.");
  }
  if (!process.env.CORS_ORIGIN || process.env.CORS_ORIGIN === "*") {
    problemas.push("CORS_ORIGIN ausente ou '*' — defina o domínio exato do site em produção.");
  }

  if (problemas.length > 0) {
    console.error("[SEGURANÇA] Configuração insegura detectada para produção:");
    problemas.forEach((p) => console.error(`  - ${p}`));
    throw new Error("Aborting: configure variáveis de ambiente seguras antes de subir em produção.");
  }
}

const app = express();
const PORT = process.env.PORT || 4000;

// Necessário para que express-rate-limit identifique o IP real do cliente
// corretamente atrás do proxy reverso (Caddy/Nginx).
app.set("trust proxy", 1);

// Garante que a pasta de uploads exista
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Middlewares globais de segurança
app.disable("x-powered-by");
app.use(
  helmet({
    // A API roda num subdomínio separado do frontend (ex: api.seudominio.org.br
    // vs seudominio.org.br) e serve as imagens de /uploads para ele — o padrão
    // "same-origin" do helmet bloquearia essas imagens no navegador.
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);

const origensPermitidas = (process.env.CORS_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origem) => origem.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origem, callback) {
      // Requisições sem header Origin (ex: curl, apps mobile, health checks)
      // são permitidas; navegadores sempre enviam Origin em chamadas cross-site.
      if (!origem || origensPermitidas.includes(origem)) {
        return callback(null, true);
      }
      return callback(new Error("Origem não permitida pela política de CORS."));
    }
  })
);

// Limite de tamanho do corpo das requisições — mitiga ataques de negação
// de serviço via payloads gigantes em rotas públicas (ex: formulário de doação).
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

// Limite geral de requisições por IP, para toda a API
const limiteGeral = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: obterIpCliente
});
app.use("/api", limiteGeral);

app.use("/uploads", express.static(uploadsDir));

// Rota de verificação de saúde da API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", servico: "Missão Vida API", timestamp: new Date().toISOString() });
});

// Rotas da aplicação
app.use("/api/auth", authRoutes);
app.use("/api/mensagens", mensagensRoutes);
app.use("/api/noticias", noticiasRoutes);
app.use("/api/galeria", galeriaRoutes);
app.use("/api/projetos", projetosRoutes);
app.use("/api/certificados", certificadosRoutes);
app.use("/api/configuracoes", configuracoesRoutes);

// Tratamento de rota não encontrada e erros
app.use(notFoundMiddleware);
app.use(errorMiddleware);

/**
 * Aguarda o banco de dados ficar disponível antes de subir o servidor.
 * Útil em ambientes Docker onde o backend pode iniciar antes do Postgres
 * estar totalmente pronto para aceitar conexões.
 */
async function aguardarBanco(tentativas = 15, intervaloMs = 2000) {
  for (let i = 1; i <= tentativas; i++) {
    try {
      await pool.query("SELECT 1");
      console.log("[DB] Conexão com PostgreSQL estabelecida.");
      return;
    } catch (err) {
      console.log(`[DB] Aguardando banco de dados... (tentativa ${i}/${tentativas})`);
      await new Promise((resolve) => setTimeout(resolve, intervaloMs));
    }
  }
  throw new Error("Não foi possível conectar ao banco de dados.");
}

async function iniciar() {
  try {
    validarSegredosDeProducao();
    await aguardarBanco();
    await seedAdmin();
    app.listen(PORT, () => {
      console.log(`[SERVER] API Missão Vida rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error("[SERVER] Falha ao iniciar a aplicação:", err.message);
    process.exit(1);
  }
}

iniciar();

module.exports = app;
