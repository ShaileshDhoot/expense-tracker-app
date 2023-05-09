const express = require('express');
const router = express.Router();

const usercontroller = require('../controller/userController')

router.post('/postlogin',usercontroller.postLogIn)

router.post('/signUp' , usercontroller.postSignUp)


module.exports = router;