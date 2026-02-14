const mongoose = require("mongoose");
function connectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{
        console.log("Connection failed");
    })
}
module.exports = connectToDB;