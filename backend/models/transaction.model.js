const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  dateAndTime: {
    type: Date,
    trim: true,
    default:Date.now()
  },
  customerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Customers',
    require:true
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Products',
    require:true
  },
  type:{
    type:String,
    enum:['Out', 'In']
  },
  quantity:{
      type:Number,
      default:0
  }
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;