const AdminServices = require('../services/adminServices')
const S3Services = require('../services/s3services')
const Data = require('../model/expense');
const User = require('../model/signUp')


 exports.addExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;

    if (!amount || amount.length === 0) {
      return res.status(400).json({ message: 'empty amount' });
    }
    if (!description || description.length === 0) {
      return res.status(400).json({ message: 'empty description' });
    }
    if (!category || category.length === 0) {
      return res.status(400).json({ message: 'empty category' });
    }

    const expense = await Data.create({
      amount: amount,
      description: description,
      category: category,
      userId: req.user._id
    });

    const user = await User.findById(req.user._id);
    user.totalExpense += parseInt(amount);
    await user.save();

    return res.status(201).json({ message: 'expense created' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server issue' });
  }
};

/*
 A transaction is a way to ensure that a group of database operations are executed in an all-or-nothing manner.
  It means that if any operation fails,
   the entire group of operations is rolled back,
    and the database returns to its previous state before the transaction started
 */
  



// all expense
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Data.find({userId: req.user._id}); //
    return res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
   return  res.status(500).json({ message: 'Server issue' });
  }
};

// download expense

exports.downloadExpenses = async (req,res) =>{
  try{
    const expenses =await AdminServices.getExpenses(req)
    //console.log(expenses)
    const stringifyExpenses = JSON.stringify(expenses)
    //console.log(stringifyExpenses);
    const userId = req.user._id;
    const filename = `Expenses${userId}/${new Date()}.txt`
    const fileURL = await S3Services.uploadToS3(stringifyExpenses,filename)
    console.log(fileURL)
    res.status(200).json({fileURL, success:true})
  }catch(err){
    console.log(err)
  }
}

// exports.selectMonthData = async (req, res) => {
//   try {
//     const { month } = req.query;

//     const startDate = new Date(`${month}/01/${new Date().getFullYear()}`);
//     const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

//     const data = await Data.find({
//       userId: req.user._id,
//       timestamp: { $gte: startDate, $lte: endDate },
//     });

//     console.log(data);
//     return res.json(data);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Error retrieving data' });
//   }
// };






exports.monthwiseData = async (req, res) => {
  try {
    const monthlyExpenses = await Data.aggregate([
      {
        $match: {
          userId: req.user._id,
        },
      },
      {
        $group: {
          _id: { $month: '$timestamp' },
          month: { $first: { $month: '$timestamp' } },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);
    console.log(monthlyExpenses)
    return res.json(monthlyExpenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};



// delete expense
exports.deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    // Find the expense by ID and delete it
    const deletedExpense = await Data.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).send("Expense not found");
    }

    const amount = deletedExpense.amount;
    console.log(amount);

    // Find the user associated with the expense and update their totalExpense
    const user = await User.findById(req.user.id);
    if (user) {
      user.totalExpense -= amount;
      await user.save();
    }

    return res.send("Expense deleted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

