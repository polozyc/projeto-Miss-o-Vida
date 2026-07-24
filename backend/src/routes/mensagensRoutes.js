const express = require("express");
const router = express.Router();
const mensagensController = require("../controllers/mensagensController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/mensagens -> pública (formulário de contato/doação)
router.post("/", mensagensController.criar);

// GET /api/mensagens -> protegida (painel admin)
router.get("/", authMiddleware, mensagensController.listar);

// PATCH /api/mensagens/:id/lida -> protegida
router.patch("/:id/lida", authMiddleware, mensagensController.marcarComoLida);

// DELETE /api/mensagens/:id -> protegida
router.delete("/:id", authMiddleware, mensagensController.remover);

module.exports = router;
