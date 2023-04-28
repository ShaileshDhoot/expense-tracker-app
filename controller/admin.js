const Data = require('../model/expense');
const signUpData = require('../model/signUp')
exports.addExpense = (req, res, next) => {
  const Amount = req.body.amount;
  const Description = req.body.description;
  const Category = req.body.category;
  // console.log( 'addexpense  console----->',req.body);
  // console.log('userid while creating expense--->' ,req.user.id)
  if(Amount==undefined||Amount.length===0){return res.status(400).json({message:'empty amount'})}
  if(Description==undefined||Description.length===0){return res.status(400).json({message:'empty Description'})}
  if(Category==undefined||Category.length===0){return res.status(400).json({message:'empty Category'})}
  Data.create({
     amount: Amount,
      description: Description,
      category: Category,
       userId: req.user.id
  })
  .then(() => {
    // retrieve the user record and update the totalExpense column
    return signUpData.findByPk(req.user.id)
      .then((user) => {
        user.totalExpense += parseInt(Amount)
          return user.save();
      })
      .then(() => {
        return res.status(201).json({message:' expense created'})
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: 'Server issue' });
      });
  })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'Server issue' });
    });
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Data.findAll({ where: { userId: req.user.id } }); //
    return res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
   return  res.status(500).json({ message: 'Server issue' });
  }
};


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


