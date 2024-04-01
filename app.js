// Importação do módulo 'express' para criação de um servidor web
const express = require("express");

// Importação do motor de visualização 'express-handlebars'
const hbs = require("express-handlebars").engine;

// Importação dos roteadores definidos nos arquivos index.js e login.js
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");

// Inicialização do aplicativo Express
const app = express();

// Definição da porta na qual o servidor irá escutar
const port = 3000;

// Configuração do motor de visualização 'handlebars' para o Express
app.engine("hbs", hbs({ defaultLayout: "main", extname: ".hbs" }));

// Definição do mecanismo de visualização padrão para 'handlebars'
app.set("view engine", ".hbs");

// Configuração do servidor para servir arquivos estáticos a partir do diretório 'public'
app.use(express.static("public"));

// Definição dos roteadores para diferentes caminhos de URL
app.use("/", indexRouter); // Roteador para o caminho raiz
app.use("/login", loginRouter); // Roteador para o caminho '/login'

// Inicialização do servidor para escutar a porta especificada
app.listen(port, function () {
  console.log(`Servidor online na porta ${port}`);
});

// Exportação do aplicativo Express para uso em outros arquivos
module.exports = app;
