'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../..', 'config', 'db.js'))[env];
const db = {};

// Inicialização do objeto sequelize com base nas configurações do ambiente
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Leitura dos arquivos de modelo no diretório atual
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Importação e inicialização de cada modelo
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associação entre os modelos, se houver
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Adição das instâncias sequelize e Sequelize ao objeto db para acesso externo
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportação do objeto db contendo os modelos e as instâncias Sequelize
module.exports = db;
