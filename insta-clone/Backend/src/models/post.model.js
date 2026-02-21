const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
   caption:{
     type:String,
     default:""
   },
   imgUrl:{
    type:String,
    required:[true,"imgUrl is required for post"],
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"user is required for post creation"]
   }
});

const postModel = mongoose.model("post",postSchema);

module.exports = postModel;