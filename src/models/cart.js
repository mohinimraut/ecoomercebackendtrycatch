const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}, 
  cartItems:[
      {
          product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
          quantity:{type:Number,default:1},
          //Initially required price but now not we have product id the product itself fetch the price
          // price:{type:Number,required:true} 
      }
  ]

}, { timestamps: true });
module.exports = mongoose.model('Cart', cartSchema)