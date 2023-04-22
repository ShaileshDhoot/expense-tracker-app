const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({  // with help of sequelize we make association of req.user to here and make userId along in product table
    title: title,           // or can say connecting models with each other
    price: price,
    imageUrl: imageUrl,
    description: description 
  })
  .then((result)=>{
    console.log('product added successfully')
    res.redirect('/admin/products')
  })
  .catch(err=> console.log(err))
};




exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then( product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product    
    });
  })
  .catch(err=>console.log(err)) 
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
//   Product.update({title: updatedTitle, price: updatedPrice, imageUrl: updatedImageUrl, description: updatedDesc},{where:{id:prodId}})
//   .then(()=>{
//     res.redirect('/admin/products');
//   })
//   .catch(err=>console.log(err))  
  Product.findByPk(prodId)
  .then(product=>{
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    return product.save()
  })
  .then(()=>{
    res.redirect('/admin/products')
  })
  .catch(err=>console.log(err))
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err)) 
};


exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.destroy({where: {id: productId}})  // destroy keyword to delete data by aquiring id from params from url
  // Product.findByPk(productId)
  // .then(()=>{})
  .then(()=>{     
        res.redirect('/admin/products');      
  })
  .catch(err=> console.log(err))  
};
