// Arquivo: routes/register.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { registerView, registerUsuarioCliente } = require('../controllers/registerController'); // Importa as funções registerView e registerUsuarioCliente do controlador registerController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Definição da rota para o caminho raiz ('/') usando o método GET e associa a função registerView a essa rota
router.get("/", registerView);

// Definição da rota para o caminho raiz ('/') usando o método POST e associa a função registerUsuarioCliente a essa rota
router.post("/", registerUsuarioCliente);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
