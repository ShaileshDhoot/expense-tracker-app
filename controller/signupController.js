const signUpData = require('../model/signUp')
const bcrypt = require('bcrypt')


exports.getAllUser = (req,res,next)=>{
    signUpData.findAll()
    .then(data=>{
       return  res.json(data)
    })
    .catch(err=>console.log(err))  
}

// exports.getSignUpForm = (req,res,next)=>{
//     res.sendFile('signup.html', { root: './public' })
// }



exports.postSignUp = async (req,res,next)=>{
  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password;

  if (!password) {
    return res.status(400).send({ message: "Password is required" });
  }

  try {
    const existingUser = await signUpData.findOne({ where: { email: email } });

    if (existingUser) {
      return res.status(409).send({ message: "User already exists" });
    }

    const hash = bcrypt.hashSync(password, 10);
    const user = await signUpData.create({
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

  
