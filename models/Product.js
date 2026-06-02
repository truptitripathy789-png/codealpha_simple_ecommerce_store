
const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
name:String,
category:String,
brand:String,
price:Number,
image:String,
description:String,
rating:Number,
discount:Number
});
module.exports=mongoose.model("Product",productSchema);
