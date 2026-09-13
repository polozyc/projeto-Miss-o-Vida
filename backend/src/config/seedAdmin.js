const bcrypt = require("bcryptjs");
const pool = require("./database");

/**
 * Garante que exista pelo menos um administrador no banco de dados.
 * A senha é criptografada em tempo de execução (nunca versionada em texto puro).
 * Executado automaticamente toda vez que o backend sobe.
 */
async function seedAdmin() {
  const nome = process.env.ADMIN_DEFAULT_NAME || "Administrador Missão Vida";
  const email = (process.env.ADMIN_DEFAULT_EMAIL || "admin@missaovida.org.br").trim().toLowerCase();
  const senha = process.env.ADMIN_DEFAULT_PASSWORD || "missaovida2026";

  try {
    const { rows } = await pool.query("SELECT id FROM admins WHERE email = $1", [email]);

    if (rows.length > 0) {
      console.log("[SEED] Administrador padrão já existe, nada a fazer.");
      return;
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await pool.query(
      "INSERT INTO admins (nome, email, senha_hash) VALUES ($1, $2, $3)",
      [nome, email, senhaHash]
    );

    console.log("=========================================================");
    console.log("[SEED] Administrador padrão criado com sucesso!");
    console.log(`[SEED] E-mail: ${email}`);
    console.log(`[SEED] Senha:  ${senha}  (troque após o primeiro acesso)`);
    console.log("=========================================================");
  } catch (err) {
    console.error("[SEED] Falha ao criar administrador padrão:", err.message);
  }
}

module.exports = seedAdmin;
