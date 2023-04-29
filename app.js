
const express = require('express');
const cors = require('cors');
const app = express();

//routes
const mainRoutes = require('./routes/main');
const purchaseRoutes = require('./routes/purchaseRouter');
const signUpRoutes = require('./routes/signUpRoutes');
const logInRoutes = require('./routes/logInRoutes');
const premiumRoutes = require('./routes/premiumRoutes')
const resetPasswordRoutes = require('./routes/resetPasswordRoutes')

//models
const sequelize = require('./util/database');
const Forgotpassword = require('./model/forgotpassword')
const Expense = require('./model/expense');
const User = require('./model/signUp');
const Order = require('./model/order');
const dotenv = require('dotenv');

// get config vars
dotenv.config();
  
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use('/', signUpRoutes);
app.use('/', logInRoutes);
app.use('/expense', mainRoutes);
app.use('/purchase', purchaseRoutes)
app.use('/premium',premiumRoutes)
app.use('/password', resetPasswordRoutes)
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

// association of models (tables)
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync()  // {force:true}
.then(()=>{
    app.listen(3000)
})
.catch(err=> console.log(err));

