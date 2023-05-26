const User = require('../model/signUp')


const getLeaderBoard = async (req, res) => {
  try {
    const leaderBoardDetails = await User.find().sort({ totalExpense: -1 });
    res.status(200).json(leaderBoardDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

  module.exports = {getLeaderBoard}


// const getLeaderBoard = async (req, res) => {
//     try {
//       const leaderBoardDetails = await User.findAll({
//         attributes: [
//           'id','name',
//           [sequelize.fn('COALESCE', sequelize.fn('SUM', sequelize.col('expenses.amount')), 0), 'totalExpense'],
//         ],
//         include: [{
//           model: Expense,
//           attributes: [],
//         }],
//         group: ['User.id'],
//         order: [[sequelize.literal('totalExpense'), 'DESC']],
//       });
      
//       res.status(200).json(leaderBoardDetails);
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   
//--****** explaination
/*
attributes is an array which will b returned by query which  specify the columns to select from the tables.
  select the name column from the users table
  and use the ---> COALESCE and ---->SUM functions to ---->calculate the total expenses for each user
  include: An array of associations that specifies which tables to join with the primary table.
   In this case, we include the expenses table and specify that we only need to retrieve the userId column from it.

group------> An array of strings or Sequelize functions which specify the columns to group the results by
 in this case, we group the results by the id column of the users table.

order--->  array of arrays that specify the columns to order the results by, along with their sort direction.
in this case, we sort the results in descending order based on the totalExpense column we calculated earlier
*/




//---**********
//--- optimised using sql querry

// const getLeaderBoard = async (req, res) => {
//     try {
//       const leaderBoardDetails = await sequelize.query(`
//         SELECT users.name, COALESCE(SUM(expenses.amount), 0) AS totalExpense
//         FROM users
//         LEFT JOIN expenses ON users.id = expenses.userId
//         GROUP BY users.id
//         ORDER BY totalExpense DESC
//       `);
//       console.log(leaderBoardDetails);
//       res.status(200).json(leaderBoardDetails[0]);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// module.exports = {getLeaderBoard}

//---> read me by steps
// select name from users table and sum the amount column from expense table
// with sequelize.query we have join two tables
//coalesce is use to return zero if there is no expense
// AS keyword is used to rename the resulting column to total expense
// FROM - this sprecifies to get data from users table
// JOIN allows us to combine rows from two or more tables based on a related column between them
// here left join as id column from users table and userId column from  expenses table
// order the result by total expenses in descending order


// const getLeaderBoard = async (req, res) => {
//     try {
//       const users = await User.findAll({
//         include: [{ model: Expense }]
//       })  
//       const leaderBoardDetails = users
//         .map(user => ({
//           name: user.name,
//           totalExpense: user.Expenses.reduce((total, expense) => total + (expense.amount || 0), 0)
//         }))
//         .sort((a, b) => (b.totalExpense || 0) - (a.totalExpense || 0))
//       res.status(200).json(leaderBoardDetails);
  
//     } catch (err) {
//       console.log(err);
//     }
//   };



// const getLeaderBoard = async(req, res)=>{
//     try{
//         const users =await User.findAll();
//         const expenses =await Expense.findAll();
//         const userExpense = {}
//         expenses.forEach(expense => {
//             if( userExpense [expense.userId]){
//                 userExpense [expense.userId] += expense.amount 
//             }else{
//                 userExpense [expense.userId] = expense.amount 
//             }         
//         });
//         const leaderBoardDetails = []
//         users.forEach((user)=>{
//             leaderBoardDetails.push({name: user.name,totalExpense: userExpense [user.id] || 0}) 
//         })                  //  can also use map here to assign values 
//         console.log(userExpense);
//         console.log(leaderBoardDetails);
//         leaderBoardDetails.sort((a, b) => {           
            
//             return  b.totalExpense - a.totalExpense 
            
//           });
//         res.status(200).json(leaderBoardDetails)
        
//     }catch (err){
//         console.log(err);
//     }
// }