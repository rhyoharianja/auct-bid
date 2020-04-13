'use strict';
module.exports = (sequelize, DataTypes) => {
  const Uploads = sequelize.define('Uploads', {
    content: DataTypes.STRING,
    contentId: DataTypes.STRING,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    data: DataTypes.BLOB
  }, {});
  Uploads.associate = function(models) {
    // associations can be defined here
  };
  return Uploads;
};