const express = require('express');
const router = express.Router();

const {getLogInForm,getLogIn} = require('../controller/loginController')

 router.get('/login', getLogInForm)

router.post('/login', getLogIn)

module.exports = router;