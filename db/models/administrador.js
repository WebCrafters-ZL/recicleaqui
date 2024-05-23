'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Administrador extends Model {
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
    }
  }
  Administrador.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    usuario_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Administrador',
  });
  return Administrador;
};