const Sequelize= require('sequelize');

const sequelize = require('../util/database');

const Data = sequelize.define('expensedata', {
  ID:{
    type: Sequelize.INTEGER,
    autoIncrement: true,             // probably in new version have to provide default value
    allowNull: false,
    primaryKey: true
  },
  Expense_Amount: Sequelize.INTEGER,
  Description:{
    type: Sequelize.STRING,
    allowNull: false
  },
  Category:{
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Data
