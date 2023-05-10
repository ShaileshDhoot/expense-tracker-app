const AdminServices = require('../services/adminServices')
const S3Services = require('../services/s3services')
const Data = require('../model/expense');
const signUpData = require('../model/signUp')
const sequelize = require('../util/database')


// add expense 
const addExpense = async (req, res, next) => {
  try{
    let t // initialize the variable t
    const Amount = req.body.amount;
    const Description = req.body.description;
    const Category = req.body.category;

    if(Amount==undefined||Amount.length===0){return res.status(400).json({message:'empty amount'})}
    if(Description==undefined||Description.length===0){return res.status(400).json({message:'empty Description'})}
    if(Category==undefined||Category.length===0){return res.status(400).json({message:'empty Category'})}

    t = await sequelize.transaction();

    await Data.create({                         
      amount: Amount,
        description: Description,
        category: Category,
        userId: req.user.id
    }, {transaction:t}) 
    
      const user = await signUpData.findByPk(req.user.id,{transaction:t} )      
      user.totalExpense += parseInt(Amount)
      await user.save({ transaction: t });  
      await t.commit();         
      return res.status(201).json({message:' expense created'})      
      }catch(err) {
        console.log(err);
        return res.status(500).json({ message: 'Server issue' });
      };
};

/*
 A transaction is a way to ensure that a group of database operations are executed in an all-or-nothing manner.
  It means that if any operation fails,
   the entire group of operations is rolled back,
    and the database returns to its previous state before the transaction started
 */
  
// download expense
const downloadExpenses = async (req,res) =>{
  try{
    const expenses =await AdminServices.getExpenses(req)
    //console.log(expenses)
    const stringifyExpenses = JSON.stringify(expenses)
    //console.log(stringifyExpenses);
    const userId = req.user.id;
    const filename = `Expenses${userId}/${new Date()}.txt`
    const fileURL = await S3Services.uploadToS3(stringifyExpenses,filename)
    console.log(fileURL)
    res.status(200).json({fileURL, success:true})
  }catch(err){
    console.log(err)
  }
}


// all expense
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Data.findAll({ where: { userId: req.user.id } }); //
    return res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
   return  res.status(500).json({ message: 'Server issue' });
  }
};



const selectMonthData = async (req, res) => {
  try {
    const { month } = req.query;

    const startDate = new Date(`${month}/01/${new Date().getFullYear()}`);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    const data = await Data.findAll({
      where: {
        userId: req.user.id,
        createdAt: {
          [sequelize.between]: [startDate, endDate],
        },
      },
    });

    console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
};




const monthwiseData = async (req, res) => {
  try {
    const monthlyExpenses = await Data.findAll({  where: { userId: req.user.id },
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%M'), 'month'],
        [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount']
      ],
      group: ['month'],
      order: [['month', 'ASC']]
    });
   return res.json(monthlyExpenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};


// delete expense
const deleteExpense = async (req, res) => {
  try {
    
    const id = req.params.id
    console.log(id)
    const expense = await Data.findByPk(id);
    if (!expense) {
      return res.status(404).send("Expense not found");
    }

    const amount = expense.amount
    console.log(amount)
    await expense.destroy()
    const user = await signUpData.findByPk(req.user.id);
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


module.exports = {addExpense, downloadExpenses, getAllExpenses, selectMonthData,monthwiseData,deleteExpense}