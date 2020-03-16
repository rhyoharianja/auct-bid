'use strict';
module.exports = (sequelize, DataTypes) => {
  const stores = sequelize.define('stores', {
    productId: DataTypes.INTEGER,
    allowKey: DataTypes.STRING,
    startBid: DataTypes.DATE,
    endBid: DataTypes.DATE,
    userWinner: DataTypes.INTEGER,
    setWinnerDate: DataTypes.DATE,
    setWinnerBy: DataTypes.INTEGER,
    status: DataTypes.SMALLINT
  }, {});
  stores.associate = function(models) {
    // associations can be defined here
  };
  return stores;
};