const mensagensService = require("../services/mensagensService");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Os limites de nome/email/telefone/assunto espelham as colunas VARCHAR
// da tabela `mensagens` (backend/db/init.sql), para rejeitar cedo (400) em
// vez de estourar erro de banco (500) em payloads grandes demais.
const LIMITES = { nome: 150, email: 150, telefone: 30, assunto: 50, mensagem: 3000 };

function validarCampo(valor, campo, obrigatorio) {
  if (!valor) {
    if (obrigatorio) return `Campo "${campo}" é obrigatório.`;
    return null;
  }
  if (typeof valor !== "string") return `Campo "${campo}" inválido.`;
  if (valor.trim().length === 0 && obrigatorio) return `Campo "${campo}" é obrigatório.`;
  if (valor.length > LIMITES[campo]) return `Campo "${campo}" excede o tamanho máximo.`;
  return null;
}

async function criar(req, res, next) {
  try {
    const { nome, email, telefone, assunto, mensagem } = req.body || {};

    const erros = [
      validarCampo(nome, "nome", true),
      validarCampo(email, "email", true),
      validarCampo(telefone, "telefone", false),
      validarCampo(assunto, "assunto", false),
      validarCampo(mensagem, "mensagem", true)
    ].filter(Boolean);

    if (erros.length > 0) {
      return res.status(400).json({ erro: erros[0] });
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ erro: "Informe um e-mail válido." });
    }

    const nova = await mensagensService.criar({
      nome: nome.trim(),
      email: email.trim().toLowerCase(),
      telefone: telefone ? telefone.trim() : null,
      assunto: assunto ? assunto.trim() : null,
      mensagem: mensagem.trim()
    });
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
