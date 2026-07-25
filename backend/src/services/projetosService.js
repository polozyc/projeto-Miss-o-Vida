const pool = require("../config/database");

async function listarAtivos() {
  const { rows } = await pool.query(
    "SELECT * FROM projetos WHERE ativo = TRUE ORDER BY categoria, ordem, id"
  );
  return rows;
}

async function listarTodos() {
  const { rows } = await pool.query(
    "SELECT * FROM projetos ORDER BY categoria, ordem, id"
  );
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query("SELECT * FROM projetos WHERE id = $1", [id]);
  if (!rows[0]) {
    const err = new Error("Projeto não encontrado.");
    err.status = 404;
    throw err;
  }
  return rows[0];
}

async function criar({ categoria, titulo, descricao, tag, imagem_url, ordem, ativo }) {
  const { rows } = await pool.query(
    `INSERT INTO projetos (categoria, titulo, descricao, tag, imagem_url, ordem, ativo)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [categoria, titulo, descricao, tag || null, imagem_url || null, ordem ?? 0, ativo ?? true]
  );
  return rows[0];
}

async function atualizar(id, { categoria, titulo, descricao, tag, imagem_url, ordem, ativo }) {
  const { rows } = await pool.query(
    `UPDATE projetos
     SET categoria = $1, titulo = $2, descricao = $3, tag = $4,
         imagem_url = $5, ordem = $6, ativo = $7, atualizado_em = NOW()
     WHERE id = $8 RETURNING *`,
    [categoria, titulo, descricao, tag || null, imagem_url || null, ordem ?? 0, ativo ?? true, id]
  );
  if (!rows[0]) {
    const err = new Error("Projeto não encontrado.");
    err.status = 404;
    throw err;
  }
  return rows[0];
}

async function remover(id) {
  const { rowCount } = await pool.query("DELETE FROM projetos WHERE id = $1", [id]);
  if (rowCount === 0) {
    const err = new Error("Projeto não encontrado.");
    err.status = 404;
    throw err;
  }
}

module.exports = { listarAtivos, listarTodos, buscarPorId, criar, atualizar, remover };
