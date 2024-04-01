require('dotenv-safe').config({
    allowEmptyValues: true
});

// Importação do módulo 'sequelize' para mapeamento objeto-relacional (ORM) com o banco de dados
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
});

// Exportação para uso em outros arquivos
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
};