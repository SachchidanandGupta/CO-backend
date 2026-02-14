const express = require("express");
const jwt = require("jsonwebtoken")
const authRouter = express.Router(); // the express.Router allow the developer to create api in other files other than app.js

const userModel = require("../models/user.model");


authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  const isUserExists = await userModel.findOne({email})  // by schema we entrusted that the every user must have an unique email address but in order to show an response we need to write an verification code in backend to determine if the email already present or not 
  if(isUserExists) {
   return res.status(400).json({
      message:"email address already in use"
   })
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });
  const token = jwt.sign({
      id:user._id
   
  },process.env.JWT_SECRET)
  res.cookie("jwt_token",token);
  res.status(201).json({
    message: "user data is stored",
    user,
    token
  });
});
module.exports = authRouter;
