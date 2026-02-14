const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
authRouter.post("/register",async(req,res)=>{
    const {username , email , password} = req.body;
    const isUserExists = await userModel.findOne({email});
    if(isUserExists){
       return  res.status(400).json({
            message:"user with this email already exists"
        })
    }
    const user = await userModel.create({
        username, email , password
    })
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SCERET);
    res.cookie("jwt_token",token)
    res.status(201).json({
        message:"User data stored in DB",
        user,
        token
    })
})
module.exports = authRouter;