const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        required:[true,"Username is required for account creation"],
        unique:[true,"username already registered"]
    },
    email:{
        type:String,
        required:[true,"Email is required for account creation"],
        unique:[true,"email already in use "]
    },
    password:{
        type:String,
    required:[true,"Password is neccessary"]
    },
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/a4gxmhynr/default%20image.jpg?updatedAt=1771479506558"
    },
    bio :{
        type:String
    }
},{
    timestamps:true
});

const userModel = mongoose.model("users",userSchema);

module.exports  = userModel;