// Arquivo: routes/login.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { loginView, loginAuth } = require('../controllers/loginController'); // Importa as funções loginView e loginAuth do controlador loginController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Definição da rota para o caminho raiz ('/') usando o método GET e associa a função loginView
router.get("/", loginView);
// Definição da rota para o caminho auth ('/auth') usando o método POST e associa a função loginAuth
router.post("/auth", loginAuth);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
