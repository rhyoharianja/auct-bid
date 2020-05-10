'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StatusDescs', [{
        statusType: 'payment',
        statusCode: 10,
        statusName: 'Waiting Payment',
        statusDesc: 'Waiting Payment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusType: 'payment',
        statusCode: 11,
        statusName: 'Payment Confirmation',
        statusDesc: 'Payment Confirmation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusType: 'payment',
        statusCode: 12,
        statusName: 'Payment Expired',
        statusDesc: 'Payment Expired',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusType: 'order',
        statusCode: 20,
        statusName: 'On Order',
        statusDesc: 'Payment Confirmation',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusType: 'order',
        statusCode: 21,
        statusName: 'Order Confirmed',
        statusDesc: 'Order Confirmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusType: 'order',
        statusCode: 22,
        statusName: 'Order On Delivery',
        statusDesc: 'Order On Delivery',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusType: 'order',
        statusCode: 23,
        statusName: 'Order Finished',
        statusDesc: 'Order Finished',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StatusDescs', null, {});
  }
};
