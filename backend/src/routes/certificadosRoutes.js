const express = require("express");
const router = express.Router();
const certificadosController = require("../controllers/certificadosController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/certificados -> pública (apenas ativos)
router.get("/", certificadosController.listarPublicos);

// GET /api/certificados/admin/todos -> protegida (inclui inativos)
router.get("/admin/todos", authMiddleware, certificadosController.listarAdmin);

// GET /api/certificados/:id -> pública
router.get("/:id", certificadosController.buscarPorId);

// POST /api/certificados -> protegida
router.post("/", authMiddleware, certificadosController.criar);

// PUT /api/certificados/:id -> protegida
router.put("/:id", authMiddleware, certificadosController.atualizar);

// DELETE /api/certificados/:id -> protegida
router.delete("/:id", authMiddleware, certificadosController.remover);

module.exports = router;
