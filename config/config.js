// Importação do módulo 'fs' para manipulação de arquivos
const fs = require('fs');

module.exports = {
  // Configurações para ambiente de desenvolvimento
  development: {
    username: process.env.MYSQL_USER, // Nome de usuário do banco de dados
    password: process.env.MYSQL_PASSWORD, // Senha do banco de dados
    database: process.env.MYSQL_DB, // Nome do banco de dados
    host: process.env.MYSQL_HOST, // Endereço do host do banco de dados
    port: process.env.MYSQL_PORT, // Porta do banco de dados
    dialect: 'mysql', // Dialeto do banco de dados
    dialectOptions: {
      bigNumberStrings: true // Opções adicionais do dialeto (opcional)
    }
  },
  // Configurações para ambiente de teste (comentado por enquanto)
  // test: {
  //   username: process.env.CI_DB_USERNAME,
  //   password: process.env.CI_DB_PASSWORD,
  //   database: process.env.CI_DB_NAME,
  //   host: '127.0.0.1',
  //   port: 3306,
  //   dialect: 'mysql',
  //   dialectOptions: {
  //     bigNumberStrings: true
  //   }
  // },
  // Configurações para ambiente de produção (comentado por enquanto)
  // production: {
  //   username: process.env.PROD_DB_USERNAME,
  //   password: process.env.PROD_DB_PASSWORD,
  //   database: process.env.PROD_DB_NAME,
  //   host: process.env.PROD_DB_HOSTNAME,
  //   port: process.env.PROD_DB_PORT,
  //   dialect: 'mysql',
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //     ssl: {
  //       ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt') // Opções SSL para produção (exemplo)
  //     }
  //   }
  // }
};
