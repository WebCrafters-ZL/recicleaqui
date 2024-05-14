'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 'resetPasswordToken', {
      type: Sequelize.STRING(255),
      allowNull: true,
    });

    await queryInterface.addColumn('usuarios', 'resetPasswordExpires', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios', 'resetPasswordToken');
    await queryInterface.removeColumn('usuarios', 'resetPasswordExpires');
  }
};
