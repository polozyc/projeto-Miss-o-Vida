const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const galeriaController = require("../controllers/galeriaController");
const authMiddleware = require("../middleware/authMiddleware");

// Configuração de armazenamento local das imagens enviadas
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../../uploads")),
  filename: (req, file, cb) => {
    const nomeUnico = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, nomeUnico);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|webp|gif/;
    const extValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
    if (extValida) return cb(null, true);
    cb(new Error("Formato de imagem não suportado."));
  }
});

// GET /api/galeria -> pública
router.get("/", galeriaController.listar);

// POST /api/galeria -> protegida (upload de arquivo OU imagem_url no corpo)
router.post("/", authMiddleware, upload.single("imagem"), galeriaController.criar);

// DELETE /api/galeria/:id -> protegida
router.delete("/:id", authMiddleware, galeriaController.remover);

module.exports = router;
