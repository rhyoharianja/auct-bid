'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'BiddingTransactions', // table name
        'payment_status', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'BiddingTransactions', // table name
        'payment_desc', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('BiddingTransactions', 'payment_status'),
      queryInterface.removeColumn('BiddingTransactions', 'payment_desc')
    ]);
  }
};