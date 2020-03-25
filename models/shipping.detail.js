'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShippingDetails = sequelize.define('ShippingDetails', {
    userId: DataTypes.INTEGER,
    shippingType: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    zipPostCode: DataTypes.INTEGER,
    country: DataTypes.STRING
  }, {});
  ShippingDetails.associate = function(models) {
    // associations can be defined here
  };
  return ShippingDetails;
};