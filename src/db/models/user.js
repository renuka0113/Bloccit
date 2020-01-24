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
    allowNull: false
  },//password

  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "member"
  }

}, {});//var User
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts"
    });
  };//user.associate

  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };
  return User;
};//module exports
