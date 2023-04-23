const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mainRoutes = require('./routes/main');
const signUpRoutes = require('./routes/signUpRoutes')
app.use(express.static(path.join(__dirname, 'public')));


const sequelize = require('./util/database')
const Data = require('./model/expense')
const signUpData = require('./model/signUp')
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors());

// app.use('/public/main/css', function(req, res, next) {
//     res.setHeader('Content-Type', 'text/css');
//     next();
//   });a

app.use('/', mainRoutes);
app.use('/', signUpRoutes)

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