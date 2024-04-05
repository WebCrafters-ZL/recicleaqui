// Importação do módulo 'dotenv-safe' para carregar as variáveis de ambiente de forma segura
require('dotenv-safe').config({
  allowEmptyValues: true
});

// Importação do módulo 'express' para criação do servidor web
const express = require("express");

// Importação do motor de visualização 'express-handlebars'
const hbs = require("express-handlebars").engine;

//Importação do módulo 'passport' para gerenciar a autenticação do usuário 
const passport = require('passport');

//Importação do módulo 'express-session' para gerenciar sessões de usuário
const session = require('express-session');
require('./controllers/authLogin')(passport);

function authenticationMiddleware(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/login');
}

app.use(session({
  secret: '123', //chave que ele vai usar para criptografar os dados do cookie da sessão(tem q passar para a variavel de ambiente)
  resave: false, // Evita regravar a sessão no servidor a cada requisição
  saveUninitialized: false, // Cria uma nova sessão apenas se o usuário estiver autenticado
  cookie: {maxAge: 2 * 60 * 1000} // Define o tempo de vida do cookie da sessão (2 minutos)

}));

app.use(passport.initialize());
app.use(passport.session());
// Importação do módulo 'body-parser' para análise do corpo das requisições
const bodyParser = require('body-parser')

// Importação dos roteadores definidos no diretório routes
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

// Inicialização do aplicativo Express
const app = express();

// Definição da porta na qual o servidor irá escutar
const port = process.env.PORT;

// Configuração do motor de visualização 'handlebars' para o Express
app.engine("hbs", hbs({ defaultLayout: "main", extname: ".hbs" }));

// Definição do mecanismo de visualização padrão para 'handlebars'
app.set("view engine", ".hbs");

// Configuração do servidor para servir arquivos estáticos a partir do diretório 'public'
app.use(express.static("public"));

// Configuração do 'body-parser' para análise de dados codificados no URL
app.use(express.urlencoded({ extended: false }));

// Definição dos roteadores para diferentes caminhos de URL
app.use('/login', loginRouter); // Roteador para o caminho '/login'
app.use('/Usuario', authenticationMiddleware, usersRouter); //Roteador para o caminho Usuario/ definição de rota segura
app.use('/', authenticationMiddleware, indexRouter); // Roteador para o caminho raiz/ definição de rota segura
app.use('/register', registerRouter); // Roteador para o caminho '/register'
//Precisa ver melhor esse use a baixo, criar a rota 

// Inicialização do servidor para escutar na porta especificada
app.listen(port, function () {
  console.log(`Servidor online na porta ${port}`);
});

// Exportação do aplicativo Express para uso em outros arquivos
module.exports = app;
