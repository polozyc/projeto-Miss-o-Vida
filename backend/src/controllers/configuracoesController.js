const configuracoesService = require("../services/configuracoesService");

async function buscar(req, res, next) {
  try {
    const configuracoes = await configuracoesService.buscarTodas();
    res.json(configuracoes);
  } catch (err) {
    next(err);
  }
}

async function atualizar(req, res, next) {
  try {
    const atualizado = await configuracoesService.atualizar(req.body);
    res.json(atualizado);
  } catch (err) {
    next(err);
  }
}

module.exports = { buscar, atualizar };
