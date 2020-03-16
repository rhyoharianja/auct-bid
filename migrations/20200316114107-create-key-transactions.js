'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('key.transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keyId: {
        type: Sequelize.INTEGER
      },
      buyerId: {
        type: Sequelize.INTEGER
      },
      paymentMethod: {
        type: Sequelize.INTEGER
      },
      paymentType: {
        type: Sequelize.INTEGER
      },
      paymentStatus: {
        type: Sequelize.INTEGER
      },
      paymentDate: {
        type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('key.transactions');
  }
};