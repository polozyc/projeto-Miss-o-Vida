const pool = require("../config/database");

async function listarTodas() {
  const { rows } = await pool.query("SELECT * FROM galeria ORDER BY criado_em DESC");
  return rows;
}

async function criar({ titulo, imagem_url, categoria }) {
  const { rows } = await pool.query(
    `INSERT INTO galeria (titulo, imagem_url, categoria)
     VALUES ($1, $2, $3) RETURNING *`,
    [titulo || null, imagem_url, categoria || "geral"]
  );
  return rows[0];
}

async function remover(id) {
  const { rowCount } = await pool.query("DELETE FROM galeria WHERE id = $1", [id]);
  if (rowCount === 0) {
    const err = new Error("Foto não encontrada.");
    err.status = 404;
    throw err;
  }
}

module.exports = { listarTodas, criar, remover };
