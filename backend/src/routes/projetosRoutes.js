const express = require("express");
const router = express.Router();
const projetosController = require("../controllers/projetosController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/projetos -> pública (apenas ativos)
router.get("/", projetosController.listarPublicos);

// GET /api/projetos/admin/todos -> protegida (inclui inativos)
router.get("/admin/todos", authMiddleware, projetosController.listarAdmin);

// GET /api/projetos/:id -> pública
router.get("/:id", projetosController.buscarPorId);

// POST /api/projetos -> protegida
router.post("/", authMiddleware, projetosController.criar);

// PUT /api/projetos/:id -> protegida
router.put("/:id", authMiddleware, projetosController.atualizar);

// DELETE /api/projetos/:id -> protegida
router.delete("/:id", authMiddleware, projetosController.remover);

module.exports = router;
