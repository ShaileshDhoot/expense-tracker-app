const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mainRoutes = require('./routes/main');
const signUpRoutes = require('./routes/signUpRoutes')
const logInRoutes = require('./routes/logInRoutes')
app.use(express.static(path.join(__dirname, 'public')));


const sequelize = require('./util/database')
const Data = require('./model/expense')
const signUpData = require('./model/signUp')
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors());



app.use('/', mainRoutes);
app.use('/', signUpRoutes)
app.use('/', logInRoutes)

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connection to the database has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });

sequelize.sync().then(()=>{
    console.log('created product in db using sequeslize');
}).catch(err=> console.log(err));

app.listen(3000,()=>{
    console.log('setup on 3000');
})