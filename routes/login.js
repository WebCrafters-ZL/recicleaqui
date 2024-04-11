// Arquivo: routes/login.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { loginView } = require('../controllers/loginController'); // Importa a função loginView do controlador loginController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Definição da rota para o caminho raiz ('/') usando o método GET
router.get("/", loginView); // Quando uma requisição GET é feita para '/', chama a função loginView

// Exportação do roteador para uso em outros arquivos
module.exports = router;
