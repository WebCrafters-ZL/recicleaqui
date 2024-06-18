// Importação do módulo 'dotenv-safe' para carregar as variáveis de ambiente de forma segura
require("dotenv-safe").config({
  allowEmptyValues: true,
});

// Importação do módulo 'express-session' para criação da sessão de usuário
const session = require("express-session");

// Importação do módulo 'express' para criação do servidor web
const express = require("express");

// Importação do motor de visualização 'express-handlebars'
const handlebars = require("express-handlebars").engine;

// Importação do módulo 'moment' para manipulação de datas
const moment = require("moment");

// Middleware de tratamento de erros
const tratarErros = require("./middleware/tratarErros");

// Importação do módulo 'body-parser' para análise do corpo das requisições
const bodyParser = require("body-parser");

// Importação dos roteadores definidos no diretório routes
const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const clienteRouter = require("./routes/cliente");
const adminRouter = require("./routes/admin");

// Inicialização do aplicativo Express
const app = express();

// Definição da porta na qual o servidor irá escutar
const port = process.env.APP_PORT || 8081;

// Configuração do motor de visualização 'handlebars' para o Express
app.engine(
  "hbs",
  handlebars({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
      // Definindo o helper personalizado ifEquals
      ifEquals: function (arg1, arg2, options) {
        return arg1 == arg2 ? options.fn(this) : options.inverse(this);
      },
      // Definindo o helper personalizado dateFormat
      dateFormat: function (date, format) {
        return moment(date).format(format);
      },
    },
  })
);

// Definição do mecanismo de visualização padrão para 'handlebars'
app.set("view engine", "hbs");

// Configuração da sessão do usuário
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Configuração do servidor para servir arquivos estáticos a partir do diretório 'public'
app.use(express.static("public"));

// Configuração do 'body-parser' para análise de dados codificados no URL
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Definição dos roteadores para diferentes caminhos de URL
app.use("/", indexRouter); // Roteador para o caminho raiz
app.use("/auth", authRouter); // Roteador para o caminho '/login'
app.use("/cliente", clienteRouter); // Roteador para o caminho '/cliente'
app.use("/admin", adminRouter); // Roteador para o caminho '/admin'

// Definição das tratativas de erros
app.use(tratarErros.tratarNaoEncontrado);
app.use(tratarErros.tratarErros);

// Inicialização do servidor para escutar na porta especificada
app.listen(port, function () {
  console.log(`Servidor online na porta ${port}`);
});

// Exportação do aplicativo Express para uso em outros arquivos
module.exports = app;
