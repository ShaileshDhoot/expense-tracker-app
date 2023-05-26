const Data = require('../model/expense');
const getExpenses = async (req) => {
   try {
     const expenses = await Data.find({ userId: req.user._id });
     return expenses;
   } catch (error) {
     console.log(error);
     throw new Error('Error retrieving expenses');
   }
 };
    module.exports = {getExpenses}