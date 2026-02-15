const express = require("express");

const authRouter = express.Router();

const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const crypto = require('crypto');

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

module.exports = authRouter;
