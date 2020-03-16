'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('stores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      allowKey: {
        type: Sequelize.STRING
      },
      startBid: {
        type: Sequelize.DATE
      },
      endBid: {
        type: Sequelize.DATE
      },
      userWinner: {
        type: Sequelize.INTEGER
      },
      setWinnerDate: {
        type: Sequelize.DATE
      },
      setWinnerBy: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.SMALLINT
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
    return queryInterface.dropTable('stores');
  }
};