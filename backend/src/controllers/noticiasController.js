const noticiasService = require("../services/noticiasService");

async function listarPublicas(req, res, next) {
  try {
    const noticias = await noticiasService.listarPublicadas();
    res.json(noticias);
  } catch (err) {
    next(err);
  }
}

async function listarAdmin(req, res, next) {
  try {
    const noticias = await noticiasService.listarTodas();
    res.json(noticias);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const noticia = await noticiasService.buscarPorId(req.params.id);
    res.json(noticia);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const { titulo, resumo, conteudo, imagem_url, publicado } = req.body;
    if (!titulo || !conteudo) {
      return res.status(400).json({ erro: "Título e conteúdo são obrigatórios." });
    }
    const nova = await noticiasService.criar({ titulo, resumo, conteudo, imagem_url, publicado });
    res.status(201).json(nova);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const { titulo, resumo, conteudo, imagem_url, publicado } = req.body;
    if (!titulo || !conteudo) {
      return res.status(400).json({ erro: "Título e conteúdo são obrigatórios." });
    }
    const atualizada = await noticiasService.atualizar(req.params.id, {
      titulo, resumo, conteudo, imagem_url, publicado
    });
    res.json(atualizada);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await noticiasService.remover(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listarPublicas, listarAdmin, buscarPorId, criar, atualizar, remover };
