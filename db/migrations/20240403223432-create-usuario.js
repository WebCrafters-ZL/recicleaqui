'use strict';
/** 
 * Esta migration cria a tabela 'Usuarios' no banco de dados.
 * 
 * @type {import('sequelize-cli').Migration} 
 */
module.exports = {
  /**
   * Método 'up' responsável por definir as operações a serem executadas quando a migration é aplicada.
   * Este método cria a tabela 'Usuarios' com os respectivos campos.
   * 
   * @param {import('sequelize').QueryInterface} queryInterface Interface para execução de comandos SQL no banco de dados.
   * @param {import('sequelize').Sequelize} Sequelize Objeto Sequelize.
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      senha: {
        allowNull: false,
        type: Sequelize.STRING
      },
      permissao: {
        allowNull: false,
        type: Sequelize.ENUM('admin', 'funcionario', 'cliente')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
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
    await queryInterface.dropTable('Usuarios');
  }
};
