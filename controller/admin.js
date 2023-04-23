const Data = require('../model/expense')

const getAllExpenses = (req,res,next)=>{
    Data.findAll()
    .then(data=>{
        res.json(data)
    })
    .catch(err=>console.log(err))  
}

const getExpenseForm = (req,res,next)=>{
    res.sendFile('index.html', { root: './public' })
}

const postExpenses =  (req,res,next)=>{
    const amount = req.body.number;
    const desc = req.body.description;
    const categ = req.body.Category;
    // console.log(req.body.Category);
    // console.log(amount,desc,categ);
    Data.create({
       Expense_Amount: amount,
        Description: desc,
        Category: categ
    })
    .then(() => {
        res.redirect('/expense-tracker')
    })
    .catch(err => 
        console.log(err))    
}

// const updateExpense = async (req, res) => {
//     try {
//       const id = req.params.id;
//       const newAmount = req.body.Expense_Amount;
//       const newDescription = req.body.Description;
//       const newCategory = req.body.Category;
  
//       // Check if a row with the specified id exists in the database
//       let data = await Data.findByPk(id);      
//         // If the row exists, update it with the new data
//         data.Expense_Amount = newAmount;
//         data.Description = newDescription;
//         data.Category = newCategory;
//         await data.save();   
        
//           /// aaaah fcking check is not working
//     // itis creating new row along with editing existing row
//       res.redirect('/expense-tracker')
//     } catch (error) {
//       console.log(error);
//       res.sendStatus(500);
//     }
//   };
  
  
const updateExpense = (req, res) => {
    console.log(req.body);
    const id = req.body.ID;
    console.log(id);
    const newAmount = req.body.Expense_Amount
    const newDescription = req.body.Description
    const newCategory = req.body.Category
    // Data.update({ amount, description, Category }, { where: { id } })
    Data.findByPk(id)
    .then((data)=>{        
        data.Expense_Amount = newAmount;
        data.Description = newDescription;
        data.Category = newCategory;
        return data.save(); //----> have tp mention this stupid line to save the changes in database
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  }

  const destroyExpenses = (req, res) => {
    const id = req.params.id;
    Data.findByPk(id)
      .then(row => {
        if (!row) {
          return res.status(404).send("User not found");
        }
        row.destroy()
          .then(() => {
            res.send("User deleted successfully");
          })
          .catch(error => {
            console.log(error);
            res.status(500).send("Internal server error");
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("Internal server error");
      });
  }


  // now export the logic from controller file
  module.exports = { getAllExpenses, getExpenseForm, postExpenses, updateExpense, destroyExpenses };