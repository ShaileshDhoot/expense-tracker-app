const Sequelize= require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,             // probably in new version have to provide default value
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price:{
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull:false
  }
});

module.exports = Product

