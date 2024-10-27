
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  dateOfSale: Date,
  category: String,
  image:String,
  sold: Boolean,
});

const transactionModel = mongoose.model('transaction', transactionSchema);
module.exports=transactionModel;