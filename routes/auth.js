// Arquivo: routes/auth.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

const { authLogin, authView, authLogout, authRedefinirSenha, authAlterarSenhaView, authAlterarSenha } = require("../controllers/authController"); // Importa as funções do controlador authController

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Definição da rota para o caminho raiz ('/') usando o método GET e associa a função authView
router.get("/", authView);
// Definição da rota para o caminho '/login' usando o método POST e associa a função authLogin
router.post("/login", authLogin);
// Definição da rota para o caminho '/logout' usando o método GET e associa a função authLogout
router.get("/logout", authLogout);
// Definição de rota para o caminho '/redefinir-senha' usando o método POST e associa a função authRecuperarSenha
router.post('/redefinir-senha', authRedefinirSenha);
// Definição de rota para o caminho '/alterar-senha' usando o método GET e associa a função authRedefinirSenhaView
router.get('/alterar-senha/:token', authAlterarSenhaView);
// Definição de rota para o caminho '/alterar-senha' usando o método POST e associa a função authRedefinirSenha
router.post('/alterar-senha/:token', authAlterarSenha);

// Exportação do roteador para uso em outros arquivos
module.exports = router;
