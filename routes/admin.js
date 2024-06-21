// Arquivo: routes/admin.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Importa as funções do controlador adminController
const { 
    adminView,
    usuariosView,
    agendamentosView
 } = require("../controllers/adminController");

// Importa a função requerirLogin do middleware requerirLogin
const requerirLogin = require("../middleware/requerirLogin");
// Definição da rota para o caminho '/' usando o método GET e associa a função adminView
router.get("/", requerirLogin, adminView);
// Rota para a página de gerenciamento de usuários
router.get("/usuarios", requerirLogin, usuariosView);
// Rota para a página de gerenciamento de Agendamentos
router.get("/agendamentos", requerirLogin, agendamentosView);


// Exportação do roteador para uso em outros arquivos
module.exports = router;

