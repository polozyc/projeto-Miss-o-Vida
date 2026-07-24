const { Pool } = require("pg");
require("dotenv").config();

// Se DATABASE_URL estiver definida (ex: string de conexão do Neon, Supabase, etc.),
// usamos ela — é o formato padrão de bancos gerenciados na nuvem, que também exigem
// conexão criptografada (SSL). Caso contrário, usamos as variáveis separadas
// (DB_HOST, DB_USER, ...), formato usado no docker-compose local.
const configuracaoConexao = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || "missaovida",
      password: process.env.DB_PASSWORD || "missaovida123",
      database: process.env.DB_NAME || "missaovida_db",
      ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
    };

const pool = new Pool({
  ...configuracaoConexao,
  max: 10,
  idleTimeoutMillis: 30000
});

pool.on("error", (err) => {
  console.error("[DB] Erro inesperado no pool de conexões:", err.message);
});

module.exports = pool;

