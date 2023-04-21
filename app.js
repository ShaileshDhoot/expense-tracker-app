const path = require('path');
const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// initialize express app
const app = express();

// import Sequelize ORM instance and model
const sequelize = require('./util/database')
const User = require('./models/user')

// set up middleware to parse incoming JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// enable cross-origin resource sharing
app.use(cors());

app.get('/alluser', (req,res)=>{
    User.findAll()
    .then(users=>{
        res.json(users)
    })
    .catch(err=>console.log(err))
})

app.get('/user',(req,res)=>{
    res.sendFile(__dirname+'/curdOperations.html')
})

app.post('/user', (req,res)=>{
    const name = req.body.name;
    const mobile = req.body.mobile;
    const email = req.body.email;

    User.create({
        name: name,
        mobile: mobile,
        email: email
    })
    .then(() => {
        res.redirect('/user')
    })
    .catch(err => 
        console.log(err))
    
})

//edit from database

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, mobile, email } = req.body;
    User.update({ name, mobile, email }, { where: { id } })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  });

// remove from database

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
      .then(user => {
        if (!user) {
          return res.status(404).send("User not found");
        }
        user.destroy()
          .then(() => {
            res.send("User deleted successfully");
          })
          .catch(error => {
            console.log(error);
            res.status(500).send("Internal server error");
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("Internal server error");
      });
  });

sequelize.sync().then(()=>{
    console.log('created product in db using sequeslize');
}).catch(err=> console.log(err));

// start the server
app.listen(3000, () => {
    console.log('setup on 3000 is done');
    });
