const express = require('express');
const { getAllUser, getSignUpForm, postSignUp } = require('../controller/signupController');
const router = express.Router();

router.get('/', getAllUser)

router.get('/signUpPage', getSignUpForm)

router.post('/welcome' , postSignUp)

module.exports = router;