// Importação dos módulos necessários
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
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/Usuario'); // Importação do modelo de usuário
const { eAdmin } = require('.middleware/auth'); // Importação do middleware de autenticação

// Inicialização do aplicativo Express
const app = express();

// Middleware do Express para analisar o corpo das requisições com formato JSON
app.use(express.json());

// Rota para listar usuários (exemplo de autenticação de administrador)
app.get('/', eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "Listar usuários",
        id_usuario_logado: req.userId
    });
});

// Rota para cadastrar um usuário
app.post('/cadastrar', async (req, res) => {
    // Hash da senha usando bcrypt (exemplo)
    const password = await bcrypt.hash(req.body.password, 8);

    console.log(password); // Apenas para exemplo
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
    // Validação do login (exemplo, requer ajustes)
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorretos!"
        });
    }

    // Verificação da senha usando bcrypt (exemplo)
    const isValidPassword = await bcrypt.compare(req.body.password, "senha_hash_do_banco_de_dados");
    if (!isValidPassword) {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou senha incorretos!"
        });
    }

    // Geração do token de autenticação usando jsonwebtoken (exemplo)
    const token = jwt.sign({ id: 1 }, "segredo_do_token", {
        expiresIn: '7d' // Token válido por 7 dias
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});

// Rota de exemplo para listar usuários (exemplo de uso de middleware)
app.get('/usuarios', eAdmin, async (req, res) => {
    // Implementação da lógica para listar usuários
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

// Exportação do aplicativo Express para uso em outros arquivos
module.exports = app;
