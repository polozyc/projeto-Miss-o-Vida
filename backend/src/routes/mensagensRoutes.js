const express = require("express");
const rateLimit = require("express-rate-limit");
const router = express.Router();
const mensagensController = require("../controllers/mensagensController");
const authMiddleware = require("../middleware/authMiddleware");
const obterIpCliente = require("../utils/obterIpCliente");

// Limita envios do formulário público — mitiga spam/flood no painel de mensagens
const criarLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: obterIpCliente,
  message: { erro: "Muitas mensagens enviadas. Tente novamente em alguns minutos." }
});

// POST /api/mensagens -> pública (formulário de contato/doação)
router.post("/", criarLimiter, mensagensController.criar);

// GET /api/mensagens -> protegida (painel admin)
router.get("/", authMiddleware, mensagensController.listar);

// PATCH /api/mensagens/:id/lida -> protegida
router.patch("/:id/lida", authMiddleware, mensagensController.marcarComoLida);

// DELETE /api/mensagens/:id -> protegida
router.delete("/:id", authMiddleware, mensagensController.remover);

module.exports = router;
