// Arquivo: routes/register.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { registerView, registerUser, registerUsuarioCliente } = require('../controllers/registerController');

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Definição da rota para o caminho raiz ('/') usando o método GET
router.get("/", registerView);
router.post("/", registerUsuarioCliente);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
