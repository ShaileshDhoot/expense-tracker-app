const express = require('express');
const router = express.Router();
const mainController = require('../controller/admin');
const middlewareFunc = require('../middleware/auth')

router.post('/add', middlewareFunc.authMiddleware ,mainController.addExpense);
router.get('/all', middlewareFunc.authMiddleware,mainController.getAllExpenses);

router.delete('/add/delete/:id', mainController.deleteExpense);

module.exports = router;

//router.put('/update/:id', mainController.updateExpense);