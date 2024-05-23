'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        sourceKey: "id"
      });

      this.belongsTo(models.Regiao, {
        foreignKey: "regiao_id",
        sourceKey: "id"
      });
    }
  }
  Funcionario.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    usuario_id: DataTypes.INTEGER,
    regiao_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Funcionario',
  });
  return Funcionario;
};