const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const authController = require("../controllers/authController");
const obterIpCliente = require("../utils/obterIpCliente");

// Limita tentativas de login por IP — mitiga força bruta/credential stuffing
// contra a conta de admin (que controla, entre outras coisas, a chave Pix).
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: obterIpCliente,
  message: { erro: "Muitas tentativas de login. Tente novamente em alguns minutos." }
});

// POST /api/auth/login
router.post("/login", loginLimiter, authController.login);

module.exports = router;
