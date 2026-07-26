const express = require("express");
const router = express.Router();
const configuracoesController = require("../controllers/configuracoesController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/configuracoes -> pública
router.get("/", configuracoesController.buscar);

// PUT /api/configuracoes -> protegida (admin edita telefone, email, pix, etc.)
router.put("/", authMiddleware, configuracoesController.atualizar);

module.exports = router;
