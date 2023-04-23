const express = require('express');
const router = express.Router();
const { getAllExpenses, getExpenseForm, postExpenses, updateExpense, destroyExpenses } = require('../controller/admin');

router.get('/allexpense', getAllExpenses);

router.get('/expense-tracker', getExpenseForm);

router.post('/expense-tracker', postExpenses);

router.put('/expense-tracker/:id', updateExpense);

router.delete("/expense-tracker/:id", destroyExpenses);


  module.exports = router; // brought all the code here, replace app with router then export this router

  // and as we brought the code also migrate the logic to contoller section