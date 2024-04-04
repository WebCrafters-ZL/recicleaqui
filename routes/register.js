// Arquivo: routes/register.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

// Definição da rota para o caminho raiz ('/') usando o método GET
router.get("/", function (req, res, next) {
    // Renderização do template 'register' com os dados passados ({ title: "RecicleAqui - Cadastro" })
    res.render("register", { title: "RecicleAqui - Cadastro", layout: 'registerLayout' });
})

// Exportação do roteador para uso em outros arquivos
module.exports = router;
