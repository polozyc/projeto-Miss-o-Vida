const projetosService = require("../services/projetosService");

async function listarPublicos(req, res, next) {
  try {
    const projetos = await projetosService.listarAtivos();
    res.json(projetos);
  } catch (err) {
    next(err);
  }
}

async function listarAdmin(req, res, next) {
  try {
    const projetos = await projetosService.listarTodos();
    res.json(projetos);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const projeto = await projetosService.buscarPorId(req.params.id);
    res.json(projeto);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const { categoria, titulo, descricao, tag, imagem_url, ordem, ativo } = req.body;
    if (!categoria || !titulo || !descricao) {
      return res.status(400).json({ erro: "Categoria, título e descrição são obrigatórios." });
    }
    const novo = await projetosService.criar({ categoria, titulo, descricao, tag, imagem_url, ordem, ativo });
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const { categoria, titulo, descricao, tag, imagem_url, ordem, ativo } = req.body;
    if (!categoria || !titulo || !descricao) {
      return res.status(400).json({ erro: "Categoria, título e descrição são obrigatórios." });
    }
    const atualizado = await projetosService.atualizar(req.params.id, {
      categoria, titulo, descricao, tag, imagem_url, ordem, ativo
    });
    res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await projetosService.remover(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listarPublicos, listarAdmin, buscarPorId, criar, atualizar, remover };
