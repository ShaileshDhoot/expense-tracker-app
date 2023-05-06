const express = require('express');
const router = express.Router();

const { postSignUp, postLogIn} = require('../controller/userController')

router.post('/postlogin', postLogIn)

router.post('/signUp' , postSignUp)


module.exports = router;