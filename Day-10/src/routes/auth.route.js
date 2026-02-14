const express = require("express");

const authRouter = express.Router();

const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "Cookies fetched.",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "email not founded.",
    });
  }
  const isPasswordCorrect = user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCERET,
  );
  res.status(200).json({
    message: "login successfull",
    user,
  });
});

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(409).json({
      message: "Email ID already in registered, use different account",
    });
  }
  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");
  const users = await userModel.create({
    username,
    email,
    password:hashedPassword,
  });
  const token = jwt.sign(
    {
      id: users._id,
      email: users.email,
    },
    process.env.JWT_SCERET,
  );
  res.cookie("JWT_TOKEN", token);

  res.status(201).json({
    message: "user registerd in DB",
    users,
    token,
  });
});

module.exports = authRouter;
