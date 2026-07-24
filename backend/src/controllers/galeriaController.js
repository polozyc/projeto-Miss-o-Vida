const galeriaService = require("../services/galeriaService");

async function listar(req, res, next) {
  try {
    const fotos = await galeriaService.listarTodas();
    res.json(fotos);
  } catch (err) {
    next(err);
  }
}

async function criar(req, res, next) {
  try {
    const { titulo, categoria } = req.body;

    // Aceita tanto upload de arquivo (multer) quanto uma URL enviada no corpo
    const imagem_url = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imagem_url;

    if (!imagem_url) {
      return res.status(400).json({ erro: "É necessário enviar uma imagem ou uma URL de imagem." });
    }

    const nova = await galeriaService.criar({ titulo, imagem_url, categoria });
    res.status(201).json(nova);
  } catch (err) {
    next(err);
  }
}

async function remover(req, res, next) {
  try {
    await galeriaService.remover(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { listar, criar, remover };
