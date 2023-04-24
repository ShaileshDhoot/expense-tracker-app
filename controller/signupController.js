const signUpData = require('../model/signUp')

exports.getAllUser = (req,res,next)=>{
    signUpData.findAll()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>console.log(err))  
}



exports.getSignUpForm = (req,res,next)=>{
    res.sendFile('signup.html', { root: './public' })
}

exports.postSignUp = (req, res, next) => {
    const fullName = req.body.name;
    const emailId = req.body.email;
    const password = req.body.password;
    
    signUpData.findOne({ where: { Email: emailId } }) // sequelize method - findOne to check by email
        .then(user => {
            if (user) {
                // user already exists
                res.status(409).json({ message: "User already exists" });
            } else {
                signUpData.create({
                    Name: fullName,
                    Email: emailId,
                    Password: password
                })
                .then(() => {
                    res.redirect('/expense-tracker');
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
}



