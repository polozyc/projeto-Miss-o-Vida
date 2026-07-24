const authService = require("../services/authService");

async function login(req, res, next) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Informe e-mail e senha." });
    }

    const resultado = await authService.autenticar(email, senha);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

module.exports = { login };
