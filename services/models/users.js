'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    // id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};