const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// initialize express app
const app = express();
const mainRoutes = require('./routes/main');

app.use(express.static(path.join(__dirname, 'public')));


// import Sequelize ORM instance and model
const sequelize = require('./util/database')
const Data = require('./model/expense')

// set up middleware to parse incoming JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// enable cross-origin resource sharing
app.use(cors());

// app.use('/public/main/css', function(req, res, next) {
//     res.setHeader('Content-Type', 'text/css');
//     next();
//   });

app.use('/', mainRoutes);


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