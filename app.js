// Importação do módulo 'dotenv-safe' para carregar as variáveis de ambiente de forma segura
require('dotenv-safe').config({
  allowEmptyValues: true
});

// Importação do módulo 'express' para criação da sessão de usuário
const session = require('express-session');

// Importação do módulo 'express' para criação do servidor web
const express = require("express");

// Importação do motor de visualização 'express-handlebars'
const hbs = require("express-handlebars").engine;

// Importação do módulo 'body-parser' para análise do corpo das requisições
const bodyParser = require('body-parser')

// Importação dos roteadores definidos no diretório routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const clienteRouter = require('./routes/cliente');

// Inicialização do aplicativo Express
const app = express();

// Definição da porta na qual o servidor irá escutar
const port = process.env.APP_PORT || 8081;

// Configuração do motor de visualização 'handlebars' para o Express
app.engine("hbs", hbs({ defaultLayout: "main", extname: ".hbs" }));

// Definição do mecanismo de visualização padrão para 'handlebars'
app.set("view engine", ".hbs");

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Configuração do servidor para servir arquivos estáticos a partir do diretório 'public'
app.use(express.static("public"));

// Configuração do 'body-parser' para análise de dados codificados no URL
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Definição dos roteadores para diferentes caminhos de URL
app.use('/', indexRouter); // Roteador para o caminho raiz
app.use('/login', loginRouter); // Roteador para o caminho '/login'
app.use('/register', registerRouter); // Roteador para o caminho '/register'
app.use('/cliente', clienteRouter); // Roteador para o caminho '/cliente'

// Inicialização do servidor para escutar na porta especificada
app.listen(port, function () {
  console.log(`Servidor online na porta ${port}`);
});

// Exportação do aplicativo Express para uso em outros arquivos
module.exports = app;
