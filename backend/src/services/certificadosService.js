const pool = require("../config/database");

async function listarAtivos() {
  const { rows } = await pool.query(
    "SELECT * FROM certificados WHERE ativo = TRUE ORDER BY ordem, id"
  );
  return rows;
}

async function listarTodos() {
  const { rows } = await pool.query(
    "SELECT * FROM certificados ORDER BY ordem, id"
  );
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query("SELECT * FROM certificados WHERE id = $1", [id]);
  if (!rows[0]) {
    const err = new Error("Certificado não encontrado.");
    err.status = 404;
    throw err;
  }
  return rows[0];
}

async function criar({ titulo, descricao, categoria, arquivo_url, data_referencia, ordem, ativo }) {
  const { rows } = await pool.query(
    `INSERT INTO certificados (titulo, descricao, categoria, arquivo_url, data_referencia, ordem, ativo)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [titulo, descricao || null, categoria || "documento", arquivo_url, data_referencia || null, ordem ?? 0, ativo ?? true]
  );
  return rows[0];
}

async function atualizar(id, { titulo, descricao, categoria, arquivo_url, data_referencia, ordem, ativo }) {
  const { rows } = await pool.query(
    `UPDATE certificados
     SET titulo = $1, descricao = $2, categoria = $3, arquivo_url = $4,
         data_referencia = $5, ordem = $6, ativo = $7, atualizado_em = NOW()
     WHERE id = $8 RETURNING *`,
    [titulo, descricao || null, categoria || "documento", arquivo_url, data_referencia || null, ordem ?? 0, ativo ?? true, id]
  );
  if (!rows[0]) {
    const err = new Error("Certificado não encontrado.");
    err.status = 404;
    throw err;
  }
  return rows[0];
}

async function remover(id) {
  const { rowCount } = await pool.query("DELETE FROM certificados WHERE id = $1", [id]);
  if (rowCount === 0) {
    const err = new Error("Certificado não encontrado.");
    err.status = 404;
    throw err;
  }
}

module.exports = { listarAtivos, listarTodos, buscarPorId, criar, atualizar, remover };
