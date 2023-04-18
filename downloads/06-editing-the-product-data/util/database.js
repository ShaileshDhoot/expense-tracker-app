const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'admin' ,'root', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize