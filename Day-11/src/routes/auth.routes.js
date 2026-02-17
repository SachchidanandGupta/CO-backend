const express = require("express");

const authRouter = express.Router();

const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const crypto = require('crypto');

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "Cookies fetched.",
  });
});


authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({
      message: "USER ALREADY REGISTERD WITH THIS EMAIL",
    });
  }
  
  const user = await userModel.create({
    username,
    email,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCERET,
  );

  res.cookie("JWT_TOKEN", token);

  res.status(201).json({
    message: "user data stored in Database",
    user,
    token,
  });
});


authRouter.post("/login",async(req,res)=>{
  const {email,password} = req.body;
   const user = await userModel.findOne({email});
   if(!user){
    return res.status(404).json({
      message:"User not found by this email"
    });
   }
   const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex");
 
   
})
module.exports = authRouter;
