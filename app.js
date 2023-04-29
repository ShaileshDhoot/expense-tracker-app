
const express = require('express');
const cors = require('cors');
const app = express();
const mainRoutes = require('./routes/main');
const purchaseRoutes = require('./routes/purchaseRouter');
const signUpRoutes = require('./routes/signUpRoutes');
const logInRoutes = require('./routes/logInRoutes');
const premiumRoutes = require('./routes/premiumRoutes')
const sequelize = require('./util/database');
const Expense = require('./model/expense');
const User = require('./model/signUp');
const Order = require('./model/order');
const Sib = require('sib-api-v3-sdk')

require('dotenv').config()

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.SENDINBLUE_API_KEY
const transationalEmailApi = new Sib.TransactionalEmailsApi() 

const sender = {
    email: "shailesh.dhoot@yahoo.in",
    name: "shailesh"
}
const receivers = [
    {
        email: "shaileshdhoot0@gmail.com",    
    },
]
transationalEmailApi.sendTransacEmail({  
    sender,
    to : receivers,
    subject: "please confirm email id",
    textContent: `Expense Tracker {{params.role}} Under Construction`,
    params: {
        role: "Project"
    },
})
.then(data=>{
    console.log(data);
})
.catch(err=>console.log(err))
  
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', signUpRoutes);
app.use('/', logInRoutes);
app.use('/expense', mainRoutes);
app.use('/purchase', purchaseRoutes)
app.use('/premium',premiumRoutes)
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

