const mongoose=require('mongoose');
var prodSchema= new mongoose.Schema({
    name:{type:String,required:true},
    company:String,
    price:Number,
    image:String
})
var prodModel= new mongoose.model("products",prodSchema,"products");
module.exports = prodModel;