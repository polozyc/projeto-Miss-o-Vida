const pool = require("../config/database");

async function listarPublicadas() {
  const { rows } = await pool.query(
    "SELECT * FROM noticias WHERE publicado = TRUE ORDER BY criado_em DESC"
  );
  return rows;
}

async function listarTodas() {
  const { rows } = await pool.query("SELECT * FROM noticias ORDER BY criado_em DESC");
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query("SELECT * FROM noticias WHERE id = $1", [id]);
  if (!rows[0]) {
    const err = new Error("Notícia não encontrada.");
    err.status = 404;
    throw err;
  }
  return rows[0];
}

async function criar({ titulo, resumo, conteudo, imagem_url, publicado }) {
  const { rows } = await pool.query(
    `INSERT INTO noticias (titulo, resumo, conteudo, imagem_url, publicado)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [titulo, resumo || null, conteudo, imagem_url || null, publicado ?? true]
  );
  return rows[0];
}

async function atualizar(id, { titulo, resumo, conteudo, imagem_url, publicado }) {
  const { rows } = await pool.query(
    `UPDATE noticias
     SET titulo = $1, resumo = $2, conteudo = $3, imagem_url = $4,
         publicado = $5, atualizado_em = NOW()
     WHERE id = $6 RETURNING *`,
    [titulo, resumo || null, conteudo, imagem_url || null, publicado ?? true, id]
  );
  if (!rows[0]) {
    const err = new Error("Notícia não encontrada.");
    err.status = 404;
    throw err;
  }
  return rows[0];
}

async function remover(id) {
  const { rowCount } = await pool.query("DELETE FROM noticias WHERE id = $1", [id]);
  if (rowCount === 0) {
    const err = new Error("Notícia não encontrada.");
    err.status = 404;
    throw err;
  }
}

module.exports = { listarPublicadas, listarTodas, buscarPorId, criar, atualizar, remover };
