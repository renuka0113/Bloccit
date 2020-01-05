'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email:  {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       isEmail: { msg: "must be a valid email" }
     }//validate
   },//email

   password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: { msg: "must be a valid email" }
    }//validate
  },//password
}, {});//var User
  User.associate = function(models) {
    // associations can be defined here
  };//user.associate
  return User;
};//module exports
