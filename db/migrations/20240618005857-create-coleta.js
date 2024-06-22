'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Coleta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      data: {
        allowNull: false,
        type: Sequelize.DATE
      },
      hora: {
        allowNull: false,
        type: Sequelize.TIME
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('pendente', 'aceito', 'rejeitado', 'cancelado', 'concluido')
      },
      observacao: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      avaliacao: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      cliente_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Clientes',
          },
          key: 'id'
        },
        onDelete: 'CASCADE'  
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

    // Adicionar a restrição única
    await queryInterface.addConstraint('Coleta', {
      fields: ['data', 'hora'],
      type: 'unique',
      name: 'unique_coleta_date_time'
    });
  },
  async down(queryInterface, Sequelize) {
    // Remover a tabela e a restrição única
    await queryInterface.removeConstraint('Coleta', 'unique_coleta_date_time');
    await queryInterface.dropTable('Coleta');
  }
};
