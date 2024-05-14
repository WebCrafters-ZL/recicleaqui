'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'tokenRedefinicaoSenha', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.addColumn('Usuarios', 'expiracaoTokenRedefinicaoSenha', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'tokenRedefinicaoSenha');
    await queryInterface.removeColumn('Usuarios', 'expiracaoTokenRedefinicaoSenha');
  }
};
