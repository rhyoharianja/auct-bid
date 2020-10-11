'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'KeyTransactions', // table name
        'payment_trxid', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'KeyTransactions', // table name
        'ipayment_status', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'KeyTransactions', // table name
        'ipayment_desc', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('KeyTransactions', 'payment_trxid'),
      queryInterface.removeColumn('KeyTransactions', 'ipayment_status'),
      queryInterface.removeColumn('KeyTransactions', 'ipayment_desc')
    ]);
  }
};