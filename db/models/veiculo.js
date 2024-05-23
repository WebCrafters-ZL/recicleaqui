'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Veiculo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Veiculo.init({
    marca: DataTypes.STRING,
    modelo: DataTypes.STRING,
    placa: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Veiculo',
  });
  return Veiculo;
};