'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hashedPassword = await bcrypt.hash('admin', 10);
    await queryInterface.bulkInsert('Usuarios', [
      {
        email: 'admin@recicleaqui.app',
        senha: hashedPassword,
        tipo: 'administrador',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const usuario = await queryInterface.sequelize.query(
      `SELECT id FROM Usuarios WHERE email = 'admin@recicleaqui.app';`,
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const usuarioId = usuario[0].id;

    await queryInterface.bulkInsert('Administradores', [
      {
        nome: 'Administrador',
        cpf: '12345678901',
        usuario_id: usuarioId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const usuario = await queryInterface.sequelize.query(
      `SELECT id FROM Usuarios WHERE email = 'admin@recicleaqui.app';`,
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    const usuarioId = usuario[0]?.id;

    if (usuarioId) {
      await queryInterface.bulkDelete('Administradores', { usuario_id: usuarioId }, {});
    }

    await queryInterface.bulkDelete('Usuarios', { email: 'admin@recicleaqui.app' }, {});

  }
};
