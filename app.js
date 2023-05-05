const path = require('path')
const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs')
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

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'})

const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

// get config vars
dotenv.config();
  
// app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(compression())
app.use(morgan('combined', {stream: accessLogStream}))
app.use('/', signUpRoutes);
app.use('/', logInRoutes);
app.use('/expense', mainRoutes);
app.use('/purchase', purchaseRoutes)
app.use('/premium',premiumRoutes)
app.use('/password', resetPasswordRoutes)

app.use((req,res)=>{
    console.log((req.url));
    res.sendFile(path.join(__dirname, `public/${req.url}`))
})

// association of models (tables)
User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync()  // {force:true}
.then(()=>{
    app.listen(process.env.PORT || 3000)
})
.catch(err=> console.log(err));

