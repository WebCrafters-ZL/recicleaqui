'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coleta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Cliente, {
        foreignKey: "cliente_id",
        sourceKey: "id"
      });
    }
  }
  Coleta.init({
    data: DataTypes.DATE,
    hora: DataTypes.TIME,
    status: DataTypes.ENUM('pendente', 'aceito', 'rejeitado', 'cancelado', 'concluido'),
    observacao: DataTypes.TEXT,
    avaliacao: DataTypes.INTEGER,
    cliente_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Coleta',
  });
  return Coleta;
};