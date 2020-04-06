const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  total:{
      type:Number
  },
  booked:{
      type:Number
  },
  pricePerDay:{
    type:Number
  }
}, {
  timestamps: true,
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;