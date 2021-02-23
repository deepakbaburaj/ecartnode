const mongoose=require('mongoose');
var userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
var userModel= new mongoose.model("user",userSchema,"user");
module.exports = userModel;