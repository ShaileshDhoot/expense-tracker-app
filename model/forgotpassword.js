const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForgotpasswordSchema  = new Schema({
    active: {type: Boolean},
    expiresby: {type: Date}
})

module.exports = mongoose.model('ForgotPassword', ForgotpasswordSchema)