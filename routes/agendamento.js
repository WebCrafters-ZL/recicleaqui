// Arquivo: routes/agendamento.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { agendamentoView } = require('../controllers/agendamentoController'); // Importa as funções do controlador agendamentoController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Definição da rota para o caminho raiz ('/') usando o método GET
router.get("/", agendamentoView);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
