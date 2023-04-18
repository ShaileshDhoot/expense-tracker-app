const Sequelize= require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id:{
    type: Sequelize.INTEGER,
    autoIncreament: true,
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

// const db = require('../util/database')
// const cart = require('./cart')

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

// //**************using promises and mysql */  
// static fetchAll() {
//  return db.execute('SELECT * FROM products')
// }

// static save() {
//   return db.execute(
//     'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
//     [this.title, this.price, this.imageUrl, this.description]
//   );
// }


// static findById(id) {
// return  db.execute('SELECT * FROM products WHERE products.id = ?', [id])
// }

// static deleteById(id) {
// return db.execute('DELETE * FROM products WHERE id = ?',[id])
// }
// }


