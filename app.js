
const express = require('express');
const cors = require('cors');
const app = express();
const mainRoutes = require('./routes/main');
const purchaseRoutes = require('./routes/purchaseRouter');
const signUpRoutes = require('./routes/signUpRoutes');
const logInRoutes = require('./routes/logInRoutes');
const sequelize = require('./util/database');
const Expense = require('./model/expense');
const User = require('./model/signUp');
const Order = require('./model/order')

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', signUpRoutes);
app.use('/', logInRoutes);
app.use('/expense', mainRoutes);
app.use('/purchase', purchaseRoutes)
// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=> console.log(err));

