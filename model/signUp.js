const Sequelize= require('sequelize');

const sequelize = require('../util/database');

const signUpData = sequelize.define('user', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,        
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false
  },
  password:{
    type: Sequelize.STRING,
    allowNull: false
  },
  isPremiumUser: Sequelize.BOOLEAN
});

module.exports = signUpData
