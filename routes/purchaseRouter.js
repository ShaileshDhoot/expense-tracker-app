const express = require('express');
const router = express.Router();

const purchaseController = require('../controller/purchaseController');
const middlewareFunc = require('../middleware/auth')

router.get('/premiumMembership', middlewareFunc.authMiddleware,purchaseController.premiumMembership)
router.post('/updateTransactionStatus', middlewareFunc.authMiddleware,purchaseController.updateTransactionStatus )

module.exports = router;