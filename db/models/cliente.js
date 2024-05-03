"use strict";
const { Model } = require("sequelize");

// Definição do modelo Cliente
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Método auxiliar para definição de associações.
     * Este método não faz parte do ciclo de vida do Sequelize.
     * O arquivo `models/index` chamará este método automaticamente.
     */
    static associate(models) {
      // Defina as associações aqui, se necessário
    }
  }
  // Inicialização do modelo Cliente com os atributos e opções
  Cliente.init(
    {
      cnpj: DataTypes.STRING,
      razaoSocial: DataTypes.STRING,
      nomeFantasia: DataTypes.STRING,
      cep: DataTypes.STRING,
      logradouro: DataTypes.STRING,
      numero: DataTypes.STRING,
      complemento: DataTypes.STRING,
      bairro: DataTypes.STRING,
      cidade: DataTypes.STRING,
      estado: DataTypes.STRING,
      email: DataTypes.STRING,
      telefoneEmpresa: DataTypes.STRING,
      responsavel: DataTypes.STRING,
      telefoneResponsavel: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cliente",
    }
  );
  return Cliente;
};
