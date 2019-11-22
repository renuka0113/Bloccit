'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisement = sequelize.define('Advertisement', {
    title: DataTypes.STRING
  }, {});
  Advertisement.associate = function(models) {
    // associations can be defined here
  };
  return Advertisement;
};