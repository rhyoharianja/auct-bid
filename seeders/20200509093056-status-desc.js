'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StatusDescs', [{
        statusType: 'payment',
        statusCode: 10,
        statusName: 'Waiting Payment',
        statusDesc: 'Waiting Payment'
      },
      {
        statusType: 'payment',
        statusCode: 11,
        statusName: 'Payment Confirmation',
        statusDesc: 'Payment Confirmation'
      },
      {
        statusType: 'payment',
        statusCode: 12,
        statusName: 'Payment Expired',
        statusDesc: 'Payment Expired'
      },
      {
        statusType: 'order',
        statusCode: 20,
        statusName: 'On Order',
        statusDesc: 'Payment Confirmation'
      },
      {
        statusType: 'order',
        statusCode: 21,
        statusName: 'Order Confirmed',
        statusDesc: 'Order Confirmed'
      },
      {
        statusType: 'order',
        statusCode: 22,
        statusName: 'Order On Delivery',
        statusDesc: 'Order On Delivery'
      },
      {
        statusType: 'order',
        statusCode: 23,
        statusName: 'Order Finished',
        statusDesc: 'Order Finished'
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StatusDescs', null, {});
  }
};
