const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

/**
 * Autentica um administrador pelo e-mail e senha.
 * Retorna o token JWT + dados básicos, ou lança erro se inválido.
 */
async function autenticar(email, senha) {
  const { rows } = await pool.query(
    "SELECT id, nome, email, senha_hash FROM admins WHERE email = $1",
    [email]
  );

  const admin = rows[0];
  if (!admin) {
    const err = new Error("E-mail ou senha inválidos.");
    err.status = 401;
    throw err;
  }

  const senhaValida = await bcrypt.compare(senha, admin.senha_hash);
  if (!senhaValida) {
    const err = new Error("E-mail ou senha inválidos.");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: admin.id, nome: admin.nome, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    admin: { id: admin.id, nome: admin.nome, email: admin.email }
  };
}

module.exports = { autenticar };
