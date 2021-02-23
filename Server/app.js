const express = require('express');
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const multer = require("multer");
const path= require('path');
var prodModel=require('../Server/model/productmodel');
var userModel=require('../Server/model/usermodel');
var url="mongodb://127.0.0.1:27017/sampledb";
var userdata=[];
var flag=1;

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
mongoose.connect(url,err=>
    {
        if(err) throw err;
        else
        console.log("DB connected to products db");
    })

function servercorrection(res)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/*');
    res.setHeader('Access-Control-Allow-Origin', 'https://pay.google.com/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

}
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits:{
        fileFilter: fileFilter
}});

app.get('/data',(req,res)=>{
    
    servercorrection(res);
    prodModel.find({},(err,data)=>{
        console.log(data);
        res.send(data);
    })
    
    
    
})
app.post('/insert', upload.single('imageFile'),(req,res)=>{
    
    servercorrection(res);
    var prd = new prodModel();
    prd.name=req.body.name;
    prd.company=req.body.company;
    prd.price=req.body.price;
    prd.image=req.file.filename;
    prd.save((err)=>{
        if(err) throw err;
        else
        {
            console.log("data inserted");
            res.send({msg:"data inserted"});
        }
    }) 
    
    
})
app.post('/adduser',(req,res)=>{
    servercorrection(res);
    var user = new userModel();
    user.name=req.body.name;
    user.email=req.body.email;
    user.password=req.body.password;
    user.save((err)=>
    {
        if(err) throw err;
        else{
            console.log("user added");
            res.send({msg:"user added"});
        }
    })
})
app.post('/logincheck',(req,res)=>{
    
    servercorrection(res);
    
    userModel.find({email:req.body.email},(err,data)=>{
        if(err) throw err;
        else
        {
        console.log(data);
        userdata=data[0];
    if(userdata)
    {
    if(userdata.password==req.body.password)
    {
        res.send({msg:"Success"});
        console.log("login success");
    }
    else
    {
        res.send({msg:"wrong email or password"});
    }
    
}
        else
        res.send({msg:"user not register.please register to continue"});
}
    })
    
})
app.post("/delete",function(req,res){
    servercorrection(res);

    prodModel.deleteOne({name:req.body.name},(err)=>
    {
        if(err) throw err;
        else
        {
            console.log("data deleted");
            res.send({msg:"data deleted"});
        }
    })
    // res.send({msg:"hello"})
    // console.log("am in server");
})
app.post("/update",function(req,res){
    servercorrection(res);
    var prod = {
        name:req.body.name,
    company:req.body.company,
    price:req.body.price
    };
    prodModel.updateOne({name:req.body.name},prod,(err)=>
    {
        if(err) throw err;
        else
        {
            console.log("data edited");
            res.send({msg:"data edited"});
        }
    })

})

app.get("/img/:id",(req, res)=>{
    console.log(path.join(__dirname, "../../uploads/" + req.params.id));
    res.sendFile(path.join(__dirname, "./uploads/" + req.params.id));
});
app.listen(process.env.PORT || 8000,(req,res)=>{

    console.log("listening to 8000");
    
})