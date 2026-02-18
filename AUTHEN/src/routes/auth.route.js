const express = require("express");

const userModel = require("../models/user.model");

const authRouter = express.Router();

const jwt = require("jsonwebtoken");

const crypto = require("crypto");
const { decode } = require("punycode");

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(409).json({
      message: "Email already in use. Please use an different email.",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password: crypto.createHash("md5").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCERET,
    { expiresIn: "1hr" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User data stored in the database.",
    user,
    token,
  });
});

authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(token, process.env.JWT_SCERET);

  console.log(decoded);

  const user = await userModel.findById(decoded.id);
  res.json({
    username: user.username,
    email: user.email,
  });
});

authRouter.post('/login',async(req,res)=>{
    const { email , password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({
            message:"email not founded."
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex");
    
    const isPasswordValid =  hash == user.password;

    if(!isPasswordValid){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SCERET,{expiresIn:"1h"});
    res.cookie("token",token);

    res.json({
        message:"user logged in.",
        user:{
            username:user.name,
            email:user.email
        }
    })
})

module.exports = authRouter;
