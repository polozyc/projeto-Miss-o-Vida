/**
 * Middleware central de tratamento de erros.
 * Qualquer erro passado via next(err) cai aqui.
 */
// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  console.error("[ERRO]", err.message);
  const status = err.status || 500;
  res.status(status).json({
    erro: err.message || "Erro interno do servidor."
  });
}

/**
 * Middleware para rotas não encontradas (404)
 */
function notFoundMiddleware(req, res) {
  res.status(404).json({ erro: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
}

module.exports = { errorMiddleware, notFoundMiddleware };
