const Sequelize= require('sequelize');

const sequelize = require('../util/database');

const Data = sequelize.define('expense', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,        
    allowNull: false,
    primaryKey: true
  },
  amount: Sequelize.INTEGER,
  description:{
    type: Sequelize.STRING,
    allowNull: false
  },
  category:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Data
