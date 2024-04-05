// Arquivo: routes/login.js

// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

// Criação de um novo roteador usando o método Router() do Express
const router = express.Router();

const passport = require('passport');

// Definição da rota para o caminho raiz ('/') usando o método GET
router.get("/", function (req, res, next) {

    if (req.query.fail)
        // Renderização do template 'login' com os dados passados ({ title: "RecicleAqui - Login" })
        res.render("login", { title: "RecicleAqui - Login", message: ' Usuário e/ou senha inválidos!' });
    else
        res.render("login", { message: null });
})

router.post("/auth", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
}))
res.render("login", { title: "RecicleAqui - Login", layout: "loginLayout" });


// Exportação do roteador para uso em outros arquivos
module.exports = router;
