const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const { getAllUser, getSignUpForm, postSignUp } = require('../controller/signupController');
const router = express.Router();

router.get('/', getAllUser)

router.get('/signUpPage', getSignUpForm)

router.post('/signUp' , postSignUp)

module.exports = router;