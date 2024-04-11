// Arquivo: routes/index.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { indexView } = require('../controllers/indexController'); // Importa a função indexView do controlador indexController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Definição da rota para o caminho raiz ('/') usando o método GET
router.get("/", indexView);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
