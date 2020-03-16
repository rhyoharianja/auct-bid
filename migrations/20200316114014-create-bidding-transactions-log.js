'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bidding.transactions.logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
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
      shippingType: {
        type: Sequelize.INTEGER
      },
      shippingStatus: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('bidding.transactions.logs');
  }
};