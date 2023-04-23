const Sequelize= require('sequelize');

const sequelize = require('../util/database');

const signUpData = sequelize.define('signupdata', {
  ID:{
    type: Sequelize.INTEGER,
    autoIncrement: true,        
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  Email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  Password:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = signUpData
