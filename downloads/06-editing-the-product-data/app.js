const path = require('path');
const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.get('/admin/products', (req, res, next) => {
//     const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
//     res.render('admin/products', { pageTitle: 'Admin Products', prods: products });
//   });
  
//   app.post('/admin/delete-product', (req, res, next) => {
//     const productId = req.body.productId;
//     const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
//     const updatedProducts = products.filter(product => product.id !== productId);
//     fs.writeFileSync('data/products.json', JSON.stringify(updatedProducts));
//     res.redirect('/admin/products');
//   });


app.use(errorController.get404);

app.listen(3000);
