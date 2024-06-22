"use strict";
/**
 * Esta migration cria a tabela 'Clientes' no banco de dados.
 *
 * @type {import('sequelize-cli').Migration}
 */
module.exports = {
  /**
   * Método 'up' responsável por definir as operações a serem executadas quando a migration é aplicada.
   * Este método cria a tabela 'Clientes' com os respectivos campos.
   *
   * @param {import('sequelize').QueryInterface} queryInterface Interface para execução de comandos SQL no banco de dados.
   * @param {import('sequelize').Sequelize} Sequelize Objeto Sequelize.
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clientes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cnpj: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      razaoSocial: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nomeFantasia: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      logradouro: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      numero: {
        allowNull: false,
        defaultValue: "S/N",
        type: Sequelize.STRING,
      },
      complemento: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      bairro: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cidade: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      estado: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      telefoneEmpresa: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      responsavel: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      telefoneResponsavel: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      usuario_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Usuarios',
          },
          key: 'id'
        },
        onDelete: 'CASCADE'  // Ação a ser tomada ao deletar o usuário associado
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  /**
   * Método 'down' responsável por definir as operações a serem executadas quando a migration é revertida.
   * Este método remove a tabela 'Usuarios' do banco de dados.
   *
   * @param {import('sequelize').QueryInterface} queryInterface Interface para execução de comandos SQL no banco de dados.
   * @param {import('sequelize').Sequelize} Sequelize Objeto Sequelize.
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Clientes");
  },
};
