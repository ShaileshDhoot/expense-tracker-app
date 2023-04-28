const express = require('express');
const router = express.Router();

const premiumController = require('../controller/premiumController')
const middlewareFunc = require('../middleware/auth')

router.get('/showLeaderBoard',middlewareFunc.authMiddleware, premiumController.getLeaderBoard)

module.exports = router