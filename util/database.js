const Sequelize = require('sequelize')

const sequelize = new Sequelize('expense-tracker', 'admin' ,'root', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize

