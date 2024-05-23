'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Regiao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.faixaCep, {
        foreignKey: "regiao_id"
      });
    }
  }
  Regiao.init({
    nome: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Regiao',
  });
  return Regiao;
};