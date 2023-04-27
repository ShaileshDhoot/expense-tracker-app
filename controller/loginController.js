const signUpData = require('../model/signUp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.getLogInForm = (req,res,next)=>{
    res.sendFile('login.html', { root: './public' })
}

function generateAccessToken(id, name){
  return jwt.sign({userId: id, name:name},'secretkey')
}

exports.getLogIn = (req, res, next) => {
    const emailId = req.body.email
    const password = req.body.password
    console.log(req.body, 'login controller, getlogin function')
    signUpData.findOne({ where: { email: emailId } })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err)
            res.status(500).send({ message: "Server error" })
          } else if (result) {
           // console.log('success')
            res.status(200).send({ token: generateAccessToken(user.id, user.name)});            
          } else {
            res.status(401).send({ message: "Invalid password" })
          }
        })
      } else {
        res.status(404).send({ message: "User nee hai" })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Server error" })
    }) 
  
  }
  