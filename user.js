const Sequelize= require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('userdata', {
  ID:{
    type: Sequelize.INTEGER,
    autoIncrement: true,             // probably in new version have to provide default value
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  mobile:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User

