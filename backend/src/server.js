require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const pool = require("./config/database");
const seedAdmin = require("./config/seedAdmin");
const { errorMiddleware, notFoundMiddleware } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const mensagensRoutes = require("./routes/mensagensRoutes");
const noticiasRoutes = require("./routes/noticiasRoutes");
const galeriaRoutes = require("./routes/galeriaRoutes");
const projetosRoutes = require("./routes/projetosRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Garante que a pasta de uploads exista
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Middlewares globais
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
