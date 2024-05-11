// Arquivo: routes/cliente.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const {
  cadastrarCliente,
  atualizarCliente,
  excluirCliente,
  cadastroClienteView,
  clienteView,
} = require("../controllers/clienteController"); // Importa as funções do controlador clienteController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

const { requerirLogin } = require("../middleware/requerirLogin"); // Importa a função requerirLogin do middleware requerirLogin

// Definição da rota para o caminho '/register' usando o método GET e associa a função registerView a essa rota
router.get("/register", cadastroClienteView);
// Definição da rota para o caminho '/register' usando o método POST e associa a função clienteRegister a essa rota
router.post("/register", cadastrarCliente);
// Definição da rota para o caminho '/profile' usando o método GET e associa a função clienteView
router.get("/profile", requerirLogin, clienteView);
// Definição da rota para o caminho '/edit' usando o método GET
router.get("/edit", requerirLogin);
// Definição da rota para o caminho '/edit' usando o método POST e associa a função clienteUpdate
router.post("/edit", requerirLogin, atualizarCliente);
// Definição da rota para o caminho '/delete' usando o método GET e associa a função clienteDelete
router.get("/delete", requerirLogin, excluirCliente);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
