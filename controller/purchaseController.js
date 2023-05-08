
const Razorpay = require('razorpay')
const Order = require('../model/order')
const userController = require('../controller/userController')


exports.premiumMembership = async (req,res)=>{
    try{
        const stp = new Razorpay({
                key_id : process.env.RAZOR_PAY_KEY_ID,
                key_secret : process.env.RAZOR_PAY_KEY_SECRET
        })
        const amount = 2500;
        stp.orders.create({amount, currency: 'INR'}, (err,order)=>{
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderid : order.id, status: 'PENDING'})
            .then(()=>{
                return res.status(201).json({order, key_id: stp.key_id})
            })
            .catch(err=>console.log(err))
        })
    }catch (err){
        console.log(err)
    }
}

exports.updateTransactionStatus= async (req,res)=>{
  try{
   

    const userId = req.user.id
    const {payment_id, order_id} = req.body;
    const order = await Order.findOne({where:{orderid: order_id}})
      const prom1 = order.update({paymentid: payment_id, status: "SUCCESSFULL"})
      const prom2 = req.user.update({isPremiumUser: true})
      
      Promise.all([prom1, prom2]).then(()=>{
        return res.status(202).json({message: 'transaction successfull', token:userController.generateAccessToken(userId, undefined, true)})
      }).catch(err=>console.log(err))

  }catch(err){
    console.log(err);
    res.status(403).json({errpr: err, message:'something went wrong'})
  }
}


