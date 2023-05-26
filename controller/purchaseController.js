
const Razorpay = require('razorpay');
const Order = require('../model/order');
const userController = require('../controller/userController');

exports.premiumMembership = async (req, res) => {
  try {
    const stp = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });
    const amount = 2500;
    stp.orders.create({ amount, currency: 'INR' }, async (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      const newOrder = new Order({ orderid: order.id, status: 'PENDING' });
      await newOrder.save();
      req.user.order = newOrder._id;
      await req.user.save();
      return res.status(201).json({ order, key_id: stp.key_id });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ orderid: order_id });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.paymentid = payment_id;
    order.status = 'SUCCESSFULL';
    await order.save();

    req.user.isPremiumUser = true;
    await req.user.save();

    const token = userController.generateAccessToken(userId, undefined, true);
    return res.status(202).json({ message: 'Transaction successful', token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
