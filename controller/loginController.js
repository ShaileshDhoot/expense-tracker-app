const signUpData = require('../model/signUp')
const bcrypt = require('bcrypt')

exports.getLogInForm = (req,res,next)=>{
    res.sendFile('login.html', { root: './public' })
}

exports.getLogIn = (req, res, next) => {
    const emailId = req.body.email
    const password = req.body.password
    
    signUpData.findOne({ where: { Email: emailId } })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.Password, (err, result) => {
          if (err) {
            console.log(err)
            res.status(500).send({ message: "Server error" })
          } else if (result) {
            res.redirect('/expense-tracker')
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
  