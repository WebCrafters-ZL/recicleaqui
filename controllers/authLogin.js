// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

//Importação do módulo 'bcrypt' para criptografar a senha
const bcrypt = require('bcrypt');

//Importação do módulo 'jsonwebtoken' para criar e verificar tokens de autenticação
const jwt = require('jsonwebtoken');
const { User } = require('../models/Usuario') 

//Middleware do Express, usado para analisar o corpo da requisições com formato Json
app.use(express.json());

//Importação da estratégia de autenticação local do Passport 
const LocalStrategy = require('passport-local').Strategy;

const { eAdmin } = require('.middleware/auth');
const { Passport } = require("passport");
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

//Configura o Passport
module.exports = function(passport){

            //FindUser deve apontar para o banco(aguardando implementação do banco)
    function findUserByEmail(email, callback){ 
        return users.find(item => item.email === email);    
    }
             //FindUser deve apontar para o banco(aguardando implementação do banco)
    function findUserById(id, callback){ 
        return users.find(item => item._id === id);
    }

    //SerializeUser armazena informações do usuário na sessão, essencial para manter o estado de login entre requisições
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    //Deserialize é usado para recuperar informações do usuário da sessão, essencial para restaurar o estado de login entre as requisições.
    passport.deserializeUser((id, done) => {
        try{
            const user = findUserByEmail(email);
            done(null, user);
        }
        catch(err){
            console.log(err);
            return done(err, null);
        }
    })

    //Informa ao Passport quais campos do meu login que será usado para fazer a autenticação
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, 
    (email, password, done) => {
        try{
            const user = findUserByEmail(email);
            if(!user) return done(null, false);
            //Verifica a senha
            const isValid = bcrypt.compareSync(password, user.password);
            if(!isValid) return done(null, false);
            return done(null, user);
        }
        catch(err){
            console.log(err);
            return done(err, false);
        }

    }));
}

