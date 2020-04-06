const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name:{
      type:String,
      required:true,
      trim:true
  }
}, {
  timestamps: true,
});

const Customers = mongoose.model('Customers', customerSchema);

module.exports = Customers;