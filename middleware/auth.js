const jwt = require('jsonwebtoken');
const User = require('../model/signUp');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')
    const user = jwt.verify(token, 'secretkey');
     User.findByPk(user.userId)
     .then((user)=>{
      req.user = user;
      next();
      return
     })
     .catch(err=>console.log(err)) 
      
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'middleware issue , check there' });
  }
};

module.exports= {authMiddleware}


//this middleware function is designed to protect routes that require user authentication and authorization.
// By using JWTs, it provides a secure and efficient way to authenticate users and maintain their state across multiple requests.
