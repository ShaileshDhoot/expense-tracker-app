const path = require('path');
const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));  //middleware
app.use(express.static(path.join(__dirname, 'public')));
// adding this middleware , to store user in rquest, and can be used anywhere in the app
app.use((req,res,next)=>{
    User.findByPk(1)  //we will find user even we created user in sode afterwards because this will execute when server listens
    .then(user=>{
         req.user = user
         next()
    })
    .catch(err=>console.log(err))
})           

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

Product.belongsTo(User,{constraints: true, onDelete:'CASCADE' })  // talking about user created the product, not in regards to purchase
// if user is deleted then cascade means it will execute on product, any product related to user will also b gone
User.hasMany(Product)

// sequelize.sync({force:true}) // on setting force-true , we are enabling hard overwite out db table since we have already created table
// it emityout the table as it overwrite which is not a good way

sequelize.sync()
.then(()=>{
   return User.findByPk(1)
})
.then((user)=>{
    if(!user){
       return User.create({
            Name: 'abra ka dabra',Email: 'abra_ka@dabra-mail.com' 
        })
    }return user
})
// .then(user=>{
//     //console.log(user);
// })
.catch(err=> console.log(err));

app.listen(3000);
