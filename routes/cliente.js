// Arquivo: routes/cliente.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const {
  cadastrarCliente,
  atualizarCliente,
  excluirCliente,
  cadastroClienteView,
  clienteView,
  clienteCadastrarColetaView,
  clienteCadastrarColeta,
  historicoView,
  clienteCancelarColeta
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
// Definição da rota para o caminho '/excluir' usando o método GET e associa a função excluirCliente
router.get("/excluir", requerirLogin, excluirCliente);
// Definição da rota para o caminho '/cadastrar-coleta' usando o método GET e associa a função clienteCadastrarColetaView
router.get("/cadastrar-coleta", requerirLogin, clienteCadastrarColetaView);
// Definição da rota para o caminho '/cadastrar-coleta' usando o método POST e associa a função clienteCadastrarColeta
router.post("/cadastrar-coleta", requerirLogin, clienteCadastrarColeta);
// Definição da rota para o caminho '/historico-coleta' usando o método GET e associa a função historicoView
router.get("/historico-coleta", requerirLogin, historicoView);
// Definição da rota para o caminho '/cancelar-coleta' usando o método GET e associa a função clienteCancelarColeta
router.get("/cancelar-coleta/:id", requerirLogin, clienteCancelarColeta);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
