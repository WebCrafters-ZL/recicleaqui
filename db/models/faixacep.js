'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class faixaCep extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  faixaCep.init({
    cep_inicio: DataTypes.STRING,
    cep_fim: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'faixaCep',
  });
  return faixaCep;
};