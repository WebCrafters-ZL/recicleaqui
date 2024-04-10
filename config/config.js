// Importação do módulo 'fs' para manipulação de arquivos
const fs = require('fs');

// Importação do módulo 'dotenv-safe' para carregar as variáveis de ambiente de forma segura
require('dotenv-safe').config({
  allowEmptyValues: true
});

module.exports = {
  // Configurações do banco de dados
  development: {
    username: process.env.DB_USER, // Nome de usuário do banco de dados
    password: process.env.DB_PASSWORD, // Senha do banco de dados
    database: process.env.DB_NAME, // Nome do banco de dados
    host: process.env.DB_HOST, // Endereço do host do banco de dados
    dialect: 'mysql', // Dialeto do banco de dados
    dialectOptions: {
      bigNumberStrings: true // Opções adicionais do dialeto (opcional)
    }
  }
};
