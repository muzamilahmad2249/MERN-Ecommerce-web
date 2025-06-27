// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  items:{type:Number,required:true},
  amount:{type:Object,required:true},
  address:{type:String,required:true},
  status:{type:String,default:"Product Loading"},
  date:{type:Date,default:Date.now()},
  payment:{type:Boolean,default:false}
});

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);
export default orderModel;
