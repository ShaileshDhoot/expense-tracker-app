const Data = require('../model/expense');
const signUpData = require('../model/signUp')
const sequelize = require('../util/database')
exports.addExpense = async (req, res, next) => {
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



exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Data.findAll({ where: { userId: req.user.id } }); //
    return res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
   return  res.status(500).json({ message: 'Server issue' });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    
    const id = req.params.id
    const expense = await Data.findByPk(id);
    if (!expense) {
      return res.status(404).send("Expense not found");
    }

    const amount = expense.amount
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


