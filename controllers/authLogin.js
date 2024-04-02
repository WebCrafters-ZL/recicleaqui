// Importação do módulo 'express' para criação de um servidor web
const express = require("express");
//Importação do módulo 'bcrypt' para criptografar a senha
const bcrypt = require('bcrypt');
//Importação do módulo 'jsonwebtoken' para criar e verificar tokens de autenticação
const jwt = require('jsonwebtoken');
const { User } = require('../models/Usuario') 
//Middleware do Express, usado para analisar o corpo da requisições com formato Json
app.use(express.json());

const { eAdmin } = require('.middleware/auth');
app.get('/', eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "Listar usuários",
        id_usuario_logado: req.userId
    });
});

app.post('/cadastrar', async (req, res) => {
    const password = await bcrypt.hash("senha", 8);

    console.log(password); 
});


app.post('/routes/login', async (req, res ) => {
    console.log(req.loginForm);
    //validação(falta algumas alterações)
    if(req.body.email != "") {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
         });
    }
    if(!(await bcrypt.compare(req.body.password, ""))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta!"
         });
    }

    return res.json({
        erro:false,
        mensagem: "Login realizado com sucesso!",
        token
    });

    var token = jwt.sign({id: 1}, "FJ29AK1K69H0ASC82N51929ADU2JH1DH24H9023JUF1DI21N4J12", {
        expiresIn: '7d' //7 Dias, Usuario pode usar este mesmo token para fazer o login
    })
});


app.get(POST, async (req, res) => {
    console.log(req.body);
    return res.json({
        erro:false,
        mensagem: "Listar usuarios"
    });
});