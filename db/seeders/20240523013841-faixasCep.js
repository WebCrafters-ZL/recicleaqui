'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('FaixasCep', [
      {
        cep_inicio: '02000000',
        cep_fim: '02999999',
        regiao_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cep_inicio: '04000000',
        cep_fim: '04999999',
        regiao_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cep_inicio: '03000000',
        cep_fim: '03999999',
        regiao_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cep_inicio: '08000000',
        cep_fim: '08499999',
        regiao_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cep_inicio: '05000000',
        cep_fim: '05899999',
        regiao_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cep_inicio: '01000000',
        cep_fim: '01599999',
        regiao_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FaixasCep', null, {});
  },
};
