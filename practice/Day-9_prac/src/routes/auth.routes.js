const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const userModel = require("../models/user.model");
authRouter.post("/register",async(req,res)=>{
    const {name , email, password} = req.body;
    const isUserExists = await userModel.findOne({email});
    if(isUserExists){
      return  res.status(400).json({
            message:"user already existed...."
        })
    }
    const user =await  userModel.create({
        name,email,password
    });
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SCERET);
    res.cookie("JWT_TOKEN",token)
    res.status(201).json({
        message:"user data is stored in DB"
        ,user,
        token
    })
});
module.exports = authRouter;