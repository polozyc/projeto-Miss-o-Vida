const authService = require("../services/authService");

async function login(req, res, next) {
  try {
    const { email, senha } = req.body || {};

    if (!email || !senha || typeof email !== "string" || typeof senha !== "string") {
      return res.status(400).json({ erro: "Informe e-mail e senha." });
    }

    const resultado = await authService.autenticar(email.trim().toLowerCase(), senha);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
