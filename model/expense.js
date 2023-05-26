const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  });

module.exports = mongoose.model('expense', DataSchema)
