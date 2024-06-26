'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Cliente, {
        foreignKey: 'usuario_id',
        onDelete: 'CASCADE'
      });
    }
  }
  Usuario.init({
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    tipo: DataTypes.ENUM('administrador', 'cliente'),
    tokenRedefinicaoSenha: DataTypes.STRING,
    expiracaoTokenRedefinicaoSenha: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};