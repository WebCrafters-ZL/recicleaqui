// Arquivo: routes/login.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { clienteView } = require('../controllers/clienteController'); // Importa as funções clienteView do controlador clienteController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

const { requerirLogin } = require('../middleware/requerirLogin');

// Definição da rota para o caminho raiz ('/') usando o método GET e associa a função loginView
router.get("/", requerirLogin, clienteView);


// Exportação do roteador para uso em outros arquivos
module.exports = router;
