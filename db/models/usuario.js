'use strict';
const { Model } = require('sequelize');

// Definição do modelo Usuario
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Método auxiliar para definição de associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Defina as associações aqui, se necessário
    }
  }

  // Inicialização do modelo Usuario com os atributos e opções
  Usuario.init({
    email: DataTypes.STRING, // Atributo para armazenar o email do usuário
    senha: DataTypes.STRING, // Atributo para armazenar a senha do usuário
    permissao: DataTypes.ENUM('admin', 'funcionario', 'cliente') // Atributo para armazenar a permissão do usuário
  }, {
    sequelize, // Objeto Sequelize passado para o modelo
    modelName: 'Usuario', // Nome do modelo
  });

  return Usuario; // Retorna o modelo Usuario para ser utilizado em outras partes do código
};
