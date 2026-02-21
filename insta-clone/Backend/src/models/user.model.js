const mongoose = require("mongoose");
 const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already in use."],
        required:[true,"Username can't be blank."]
    },
    email:{
        type:String,
        unique:[true,"Email already in use."],
        required:[true,"Email is required."]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    bio:String,
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/a4gxmhynr/default%20image.jpg"
    },
 });

 const userModel = mongoose.model("users",userSchema);

 module.exports = userModel;