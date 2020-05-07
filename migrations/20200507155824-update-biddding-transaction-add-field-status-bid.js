'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'BiddingTransactions', // table name
        'biddngStatus', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 0
        }
      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('BiddingTransactions', 'biddngStatus')
    ]);
  }
};
