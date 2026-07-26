const certificadosService = require("../services/certificadosService");

async function listarPublicos(req, res, next) {
  try {
    const certificados = await certificadosService.listarAtivos();
    res.json(certificados);
  } catch (err) {
    next(err);
  }
}

async function listarAdmin(req, res, next) {
  try {
    const certificados = await certificadosService.listarTodos();
    res.json(certificados);
  } catch (err) {
    next(err);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const certificado = await certificadosService.buscarPorId(req.params.id);
    res.json(certificado);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const { titulo, descricao, categoria, arquivo_url, data_referencia, ordem, ativo } = req.body;
    if (!titulo || !arquivo_url) {
      return res.status(400).json({ erro: "Título e URL do arquivo são obrigatórios." });
    }
    const novo = await certificadosService.criar({ titulo, descricao, categoria, arquivo_url, data_referencia, ordem, ativo });
    res.status(201).json(novo);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const { titulo, descricao, categoria, arquivo_url, data_referencia, ordem, ativo } = req.body;
    if (!titulo || !arquivo_url) {
      return res.status(400).json({ erro: "Título e URL do arquivo são obrigatórios." });
    }
    const atualizado = await certificadosService.atualizar(req.params.id, {
      titulo, descricao, categoria, arquivo_url, data_referencia, ordem, ativo
    });
    res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await certificadosService.remover(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listarPublicos, listarAdmin, buscarPorId, criar, atualizar, remover };
