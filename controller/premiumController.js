const User = require('../model/signUp')
const Expense = require('../model/expense')
const sequelize = require('../util/database')

const getLeaderBoard = async(req, res)=>{
    try{
        const users =await User.findAll();
        const expenses =await Expense.findAll();
        const userExpense = {}
        expenses.forEach(expense => {
            if( userExpense [expense.userId]){
                userExpense [expense.userId] += expense.amount 
            }else{
                userExpense [expense.userId] = expense.amount 
            }         
        });
        const leaderBoardDetails = []
        users.forEach((user)=>{
            leaderBoardDetails.push({name: user.name,totalExpense: userExpense [user.id]}) 
        })                  //  can also use map here to assign values 
        console.log(userExpense);
        console.log(leaderBoardDetails);
        leaderBoardDetails.sort((a, b) => {           
            
            return  b.totalExpense - a.totalExpense 
            
          });
        res.status(200).json(leaderBoardDetails)
        
    }catch (err){
        console.log(err);
    }
}

module.exports = {getLeaderBoard}

////------optimizing with include, which include both model in single quesrry
//------const getLeaderBoard = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       include: [{ model: Expense }]
//     });

//     const leaderBoardDetails = users
//       .map(user => ({
//         name: user.name,
//         totalExpense: user.Expenses.reduce((total, expense) => total + (expense.amount || 0), 0)
//       }))
//       .sort((a, b) => (b.totalExpense || 0) - (a.totalExpense || 0));

//     res.status(200).json(leaderBoardDetails);

//   } catch (err) {
//     console.log(err);
//   }
// };
