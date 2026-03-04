const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    imageUrl:{
        type:String,
        required:[true,"imageUrl is required"]
    },
    caption:{
        type:String,
        default:""
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:[true,"UserId is required for post creation"]
    }
},{
    timestamps:true
})

const postModel = mongoose.model("posts",postSchema);
module.exports = postModel; 