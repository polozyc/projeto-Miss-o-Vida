const mensagensService = require("../services/mensagensService");

async function criar(req, res, next) {
  try {
    const { nome, email, telefone, assunto, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
      return res.status(400).json({ erro: "Nome, e-mail e mensagem são obrigatórios." });
    }

    const nova = await mensagensService.criar({ nome, email, telefone, assunto, mensagem });
    res.status(201).json(nova);
  } catch (err) {
    next(err);
  }
}

async function listar(req, res, next) {
  try {
    const mensagens = await mensagensService.listarTodas();
    res.json(mensagens);
  } catch (err) {
    next(err);
  }
}

async function marcarComoLida(req, res, next) {
  try {
    const atualizada = await mensagensService.marcarComoLida(req.params.id);
    res.json(atualizada);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await mensagensService.remover(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { criar, listar, marcarComoLida, remover };
