const User = require('../model/signUp')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const postSignUp = async (req,res,next)=>{
  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password;

  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }
  try {
    const existingUser = await User.findOne({email: email});
    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }
    const hash = bcrypt.hashSync(password, 10);
     await User.create({
      name: name,
      email: email,
      password: hash
    });
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Server error" });
  }
};

  


const generateAccessToken=(id, name, isPremiumUser)=>{
  return jwt.sign({userId: id, name:name, isPremiumUser},'secretkey')
}

const postLogIn = (req, res, next) => {
    const emailId = req.body.email
    const password = req.body.password
    //console.log(req.body, 'login controller, getlogin function')
    User.findOne({ email: emailId } )
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err)
            res.status(500).send({ alert: "Server error" })
          } else if (result) {
           // console.log('success')
            return res.status(200).send({alert: "welcome", token: generateAccessToken(user.id, user.name, user.isPremiumUser)});            
          } else {
            res.status(401).send({ alert: "Invalid password" })
          }
        })
      } else {
        res.status(404).send({ alert: "User does not exist" })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ alert: "Server error" })
    }) 
  
  }
  
  module.exports = { postSignUp, generateAccessToken,postLogIn}