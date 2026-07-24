const pool = require("../config/database");

async function criar({ nome, email, telefone, assunto, mensagem }) {
  const { rows } = await pool.query(
    `INSERT INTO mensagens (nome, email, telefone, assunto, mensagem)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nome, email, telefone || null, assunto || "contato", mensagem]
  );
  return rows[0];
}

async function listarTodas() {
  const { rows } = await pool.query(
    "SELECT * FROM mensagens ORDER BY criado_em DESC"
  );
  return rows;
}

async function marcarComoLida(id) {
  const { rows } = await pool.query(
    "UPDATE mensagens SET lida = TRUE WHERE id = $1 RETURNING *",
    [id]
  );
  if (!rows[0]) {
    const err = new Error("Mensagem não encontrada.");
    err.status = 404;
    throw err;
  }
  return rows[0];
}

async function remover(id) {
  const { rowCount } = await pool.query("DELETE FROM mensagens WHERE id = $1", [id]);
  if (rowCount === 0) {
    const err = new Error("Mensagem não encontrada.");
    err.status = 404;
    throw err;
  }
}

module.exports = { criar, listarTodas, marcarComoLida, remover };
