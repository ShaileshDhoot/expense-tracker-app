const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const OrderSchema = new Schema({
      paymentid: {type: String},
      orderid: {type:String},
      status: {type:String} 
})


module.exports = mongoose.model('Order',OrderSchema)