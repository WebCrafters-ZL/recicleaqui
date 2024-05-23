'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Regioes', [
      {
        nome: 'Norte',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Sul',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Leste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Oeste',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nome: 'Centro',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Regioes', null, {});
  },
};
