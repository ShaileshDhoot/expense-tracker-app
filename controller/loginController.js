const signUpData = require('../model/signUp')

exports.getLogInForm = (req,res,next)=>{
    res.sendFile('login.html', { root: './public' })
}

exports.getLogIn = (req, res, next) => {
    const emailId = req.body.email
    const password = req.body.password
    
    signUpData.findOne({ where: { Email: emailId } })
    .then(user => {
      if (user) {
        if (user.Password === password) {
          res.redirect('/expense-tracker')
        } else {
          res.status(401).send({ message: "Invalid password" })
        }
      } else {
        res.status(404).send({ message: "User not found" })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Server error" })
    })  
  
  }
  