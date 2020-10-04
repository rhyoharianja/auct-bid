'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('BiddingTransactions', 'payment_status', 'ipayment_status'),
      queryInterface.renameColumn('BiddingTransactions', 'payment_desc', 'ipayment_desc')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('BiddingTransactions', 'ipayment_status'),
      queryInterface.removeColumn('BiddingTransactions', 'ipayment_status')
    ]);
  }
};
