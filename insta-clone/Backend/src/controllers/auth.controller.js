const userModel = require("../models/user.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

 async function registerController(req, res)  {
  const { username, email, password, bio, profileImg } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        "User already exists." +
        (isUserExists.email == email
          ? "email already in use"
          : " username already exists"),
    });
  }

  const user = await userModel.create({
    username,
    email,
    password: await bcrypt.hash(password,10),
    bio,
    profileImg,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCERET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User data stored in Database.",
    user: {
      username,
      email,
      bio,
      profileImg,
    },
    token,
  });
}

async function loginController(req,res){
    const {username , email ,password} = req.body;

    const user = await userModel.findOne({
          $or:[
            {username},{email}
          ]
    });

    if(!user){
        return res.status(400).json({
            message:"User doesn't exists."
        })
    };
    
    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Invalid password."
        })
    }
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SCERET,{expiresIn:"1d"});

    res.status(200).json({
        message:"User Logged in..",
        token
    })

}


module.exports = {
    registerController,
    loginController
}