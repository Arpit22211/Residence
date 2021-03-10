// JShint esversion

const express=require("express");
const bodyParser=require("body-parser");
const ejs= require("ejs");
const mongoose=require("mongoose");

const app=express();
mongoose.connect("mongodb://localhost:27017/blockDB",{useNewUrlParser:true,useUnifiedTopology:true});

const blockSchema=new mongoose.Schema({
  name:String,
  address:String,
  number:String,
  rent:String,
  description:String,
  country:String,
  state:String,
  city:String
});

const Block=mongoose.model("Block",blockSchema);

let array=[];

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){

  res.render("home");
});
app.post("/",function(req,res){
  var x=req.body.find;
  if(x==="me")
  {
    res.render("find");
  }
  else
  res.render("compose");
});

app.post("/compose",function(req,res){

  const nam=req.body.name;
  const add=req.body.address;
  const num=req.body.number;
  const re=req.body.rent;
  const des=req.body.description;
  const coun=req.body.country;
  const sta=req.body.state;
  const cit=req.body.city;

  const newBlock=new Block({
    name:nam,
    address:add,
    number:num,
    rent:re,
    description:des,
    country:coun,
    state:sta,
    city:cit
  });

newBlock.save();
console.log("successfully added");

Block.create(newBlock,function(err){
  if(!err){
    console.log("successfully added");
  }
  });
  res.redirect("/");
});


app.post("/find",function(req,res){

  const status= req.body.city2;

  Block.find({city:status},function(err,foundBlocks){

    if(!err){
      res.render("details",{newItems:foundBlocks});
    }
  });
});

app.get("/blocks/:blockId",function(req,res){
console.log(req.params.blockId);

Block.findOne({number:req.params.blockId},function(err,foundBlocks){
  if(!err){
    res.render("post1",{a:foundBlocks});
  }
});

});

app.post("/post1",function(req,res){
  res.redirect("/");
});

app.listen(3000,function(){
  console.log("server started");
});
