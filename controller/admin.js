const Data = require('../model/expense');

exports.addExpense = (req, res, next) => {
  const { expenseAmount, expenseDescription, expenseCategory } = req.body;
  console.log(req.body);
  Data.create({ amount:expenseAmount,description: expenseDescription,category: expenseCategory }) //, userId: req.user.id
    .then(() => {
      res.status(201).json({ message: 'data added -success' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Server issue' });
    });
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Data.findAll(); //{ where: { userId: req.user.id } }
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server issue' });
  }
};

  
// exports.updateExpense  = (req, res) => {
//    // console.log(req.body);
//     const id = req.body.id;
//     //console.log(id);
//     const newAmount = req.body.amount
//     const newDescription = req.body.description
//     const newCategory = req.body.category
//     // Data.update({ amount, description, Category }, { where: { id } })
//     Data.findByPk(id)
//     .then((data)=>{        
//         data.amount = newAmount;
//         data.description = newDescription;
//         data.category = newCategory;
//         return data.save();
//     })
//     .then(() => {
//         res.sendStatus(200).send("Expense added successfully");
//       })
//       .catch(error => {
//         console.log(error);
//         res.sendStatus(500);    
//       });
//   }

  exports.deleteExpense = (req, res) => {
    const id = req.params.id;
    Data.findByPk(id)
      .then(row => {
        if (!row) {
          res.status(404).send("user - not found");
        }
        row.destroy()
          .then(() => {
            res.send("ser deleted ");
          })
          .catch(error => {
            console.log(error);
            res.status(500).send(" server error");
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(" server error");
      });
  }


