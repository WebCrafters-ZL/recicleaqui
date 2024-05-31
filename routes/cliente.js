// Arquivo: routes/cliente.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const {
  cadastrarCliente,
  atualizarCliente,
  excluirCliente,
  cadastroClienteView,
  clienteView, 
  agendamentoView
} = require("../controllers/clienteController"); // Importa as funções do controlador clienteController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

const requerirLogin = require("../middleware/requerirLogin"); // Importa a função requerirLogin do middleware requerirLogin

// Definição da rota para o caminho '/' usando o método GET e associa a função clienteView
router.get("/", requerirLogin, clienteView);
// Definição da rota para o caminho '/cadastrar' usando o método GET e associa a função cadastroClienteView a essa rota
router.get("/cadastrar", cadastroClienteView);
// Definição da rota para o caminho '/cadastrar' usando o método POST e associa a função cadastrarCliente a essa rota
router.post("/cadastrar", cadastrarCliente);
// Definição da rota para o caminho '/alterar' usando o método GET
router.get("/alterar", requerirLogin);
// Definição da rota para o caminho '/alterar' usando o método POST e associa a função atualizarCliente
router.post("/alterar", requerirLogin, atualizarCliente);
// Definição da rota para o caminho '/delete' usando o método GET e associa a função excluirCliente
router.get("/excluir", requerirLogin, excluirCliente);
// Definição da rota para o caminho '/agendar-coleta' usando o método GET e associa a função agendamentoView
router.get("/agendar-coleta", requerirLogin, agendamentoView)
// Definição da rota para o caminho '/agendar-coleta' usando o método POST
router.post("/agendar-coleta", requerirLogin)

// Exportação do roteador para uso em outros arquivos
module.exports = router;
