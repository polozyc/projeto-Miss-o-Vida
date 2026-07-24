const express = require("express");
const router = express.Router();
const noticiasController = require("../controllers/noticiasController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/noticias -> pública (apenas publicadas)
router.get("/", noticiasController.listarPublicas);

// GET /api/noticias/admin/todas -> protegida (inclui rascunhos)
router.get("/admin/todas", authMiddleware, noticiasController.listarAdmin);

// GET /api/noticias/:id -> pública
router.get("/:id", noticiasController.buscarPorId);

// POST /api/noticias -> protegida
router.post("/", authMiddleware, noticiasController.criar);

// PUT /api/noticias/:id -> protegida
router.put("/:id", authMiddleware, noticiasController.atualizar);

// DELETE /api/noticias/:id -> protegida
router.delete("/:id", authMiddleware, noticiasController.remover);

module.exports = router;
