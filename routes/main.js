const express = require('express');
const router = express.Router();
const mainController = require('../controller/admin');
const middlewareFunc = require('../middleware/auth')

router.post('/add', middlewareFunc.authMiddleware ,mainController.addExpense);
router.get('/all', middlewareFunc.authMiddleware,mainController.getAllExpenses);
router.get('/download', middlewareFunc.authMiddleware, mainController.downloadExpenses)
 router.delete('/add/delete/:id', middlewareFunc.authMiddleware, mainController.deleteExpense);
router.get('/all/monthly', middlewareFunc.authMiddleware , mainController.monthwiseData)
//router.get('/all/selectMonth', middlewareFunc.authMiddleware , mainController.selectMonthData)
module.exports = router;

//router.put('/update/:id', mainController.updateExpense);