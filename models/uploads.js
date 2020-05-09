'use strict';
module.exports = (sequelize, DataTypes) => {
  const Uploads = sequelize.define('Uploads', {
    content: DataTypes.STRING,
    contentId: DataTypes.STRING,
    type: DataTypes.STRING,
    name: DataTypes.STRING,
    data: {
      type: DataTypes.BLOB, 
      allowNull: true,
      get() {
          return this.getDataValue('avatar') ? this.getDataValue('avatar').toString('utf8') : null;
      },
    },
  }, {});
  Uploads.associate = function(models) {
    // associations can be defined here
  };
  return Uploads;
};