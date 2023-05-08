const Sequelize = require('sequelize')
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME ,process.env.DB_USER_PASSWORD, {dialect: 'mysql', host: process.env.DB_HOST});
// const sequelize = new Sequelize('Expensetracker', 'shailesh' ,'shailesh', {dialect: 'mysql', host: 'database-1.cpefwitfkvxi.us-east-1.rds.amazonaws.com'});

module.exports = sequelize

