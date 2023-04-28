
const Razorpay = require('razorpay')
const Order = require('../model/order')

exports.premiumMembership = async (req,res)=>{
    try{
        const stp = new Razorpay({
                key_id : 'rzp_test_NQauMjZ3I0BKfz',
                key_secret : 'gvZmWz3xnxU6bFcv2XL9IGgH'
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

exports.updateTransactionStatus=(req,res)=>{
  try{
    const {payment_id, order_id} = req.body;
    Order.findOne({where:{orderid: order_id}}).then((order)=>{
      order.update({paymentid: payment_id, status: "SUCCESSFULL"}).then(()=>{
        req.user.update({isPremiumUser: true}).then(()=>{
          return res.status(202).json({message: 'transaction successfull'})
        }).catch(err=>console.log(err))       
      }).catch(err=>console.log(err))     
    }).catch(err=>console.log(err))
  }catch(err){
    console.log(err);
    res.status(403).json({errpr: err, message:'something went wrong'})
  }
}

// //-----promise 

// // premiumMembership=()=>{
// //     const rzp = new Razorpay({
// //         key_id : process.env.Razorpay_key_id,
// //         key_secret : process.env.Razorpay_key_Secret
// //     })
// //     const amount = 2500;
// //     rzp.orders.create({amount, currency: 'INR'}, (req,res)=>{
// //         req.user.createOrder()
// //         .then(()=>{

// //         })
// //         .catch(err=>console.log(err))
// //     })
    
// // }

// exports.updateTransactionState= async(req, res)=>{
// try{

// }catch (err){
//     console.log(err);
// }
// }
