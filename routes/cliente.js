// Arquivo: routes/cliente.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const {
  clienteRegister,
  clienteDelete,
  registerView,
  clienteView,
} = require("../controllers/clienteController"); // Importa as funções clienteRegister, clienteDelete, registerView e clienteView do controlador clienteController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

const { requerirLogin } = require("../middleware/requerirLogin"); // Importa a função requerirLogin do middleware requerirLogin

// Definição da rota para o caminho '/register' usando o método GET e associa a função registerView a essa rota
router.get("/register", registerView);

// Definição da rota para o caminho '/register' usando o método POST e associa a função clienteRegister a essa rota
router.post("/register", clienteRegister);

// Definição da rota para o caminho '/profile' usando o método GET e associa a função clienteView
router.get("/profile", requerirLogin, clienteView);

// Definição da rota para o caminho '/delete/:id' usando o método GET e associa a função clienteDelete
router.get("/delete/:id", requerirLogin, clienteDelete);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
