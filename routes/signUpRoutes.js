const express = require('express');
const router = express.Router();

const { getAllUser, getSignUpForm, postSignUp } = require('../controller/signupController');


router.get('/allUser',getAllUser)

router.get('/signUpPage', getSignUpForm)

router.post('/signUp' , postSignUp)

module.exports = router;
