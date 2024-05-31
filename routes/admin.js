// Arquivo: routes/admin.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { adminView } = require('../controllers/adminController') // Importa as funções do controlador adminController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

const requerirLogin = require("../middleware/requerirLogin"); // Importa a função requerirLogin do middleware requerirLogin

// Definição da rota para o caminho '/' usando o método GET e associa a função adminView
router.get("/", requerirLogin, adminView);

// Exportação do roteador para uso em outros arquivos
module.exports = router;