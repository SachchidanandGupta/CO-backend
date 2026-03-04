const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
/**
 * @route POST /api/auth/register
 * @description to create an user
 */
async function registerController(req, res) {
  const { username, email, password, bio, profileImg } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        "User already exists. " +
        (isUserExists.email == email
          ? "Email already in use"
          : "Username already in use"),
    });
  }

  const user = await userModel.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    bio,
    profileImg,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SCERET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "user data stored in Database",
    user: {
      username,
      email,
      bio,
      profileImg,
    },
    token,
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    return res.status(404).json({
      message: "user not found,unauthorized.",
    });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect){
    return res.status(401).json({
      message:"Invalid password.."
    })
  }
  
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SCERET,
      { expiresIn: "1d" },
    );
   res.cookie("token",token)
    res.status(200).json({
      message: "user logged in.",
       user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },

    token
    });
  
}

module.exports = {
  registerController,
  loginController,
};
