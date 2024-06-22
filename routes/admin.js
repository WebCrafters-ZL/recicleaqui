// Arquivo: routes/admin.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Importa as funções do controlador adminController
const { 
    adminView,
    agendamentosView,
    clientesView,
    adminDeletarCliente,
    aceitarColeta,
    rejeitarColeta,
    concluirColeta
 } = require("../controllers/adminController");

// Importa a função requerirLogin do middleware requerirLogin
const requerirLogin = require("../middleware/requerirLogin");
// Definição da rota para o caminho '/' usando o método GET e associa a função adminView
router.get("/", requerirLogin, adminView);
// Rota para a página de gerenciamento de usuários
router.get("/usuarios", requerirLogin, clientesView);
// Rota para deletar clientes
router.get("/deletar-cliente/:id",requerirLogin, adminDeletarCliente);


// Rota para a página de gerenciamento de Agendamentos
router.get("/agendamentos", requerirLogin, agendamentosView);

//Rota para aceitar coletas
router.get("/aceitar-coleta/:id",requerirLogin, aceitarColeta);

//Rota para aceitar coletas
router.get("/rejeitar-coleta/:id",requerirLogin, rejeitarColeta);

//Rota para aceitar coletas
router.get("/concluir-coleta/:id",requerirLogin, concluirColeta);




// Exportação do roteador para uso em outros arquivos
module.exports = router;

