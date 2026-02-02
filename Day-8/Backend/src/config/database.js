
const mongoose = require("mongoose");
function connectToDb(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to database");
    }).catch((err)=>{
        console.log("connection failed");
    })
}
module.exports = connectToDb;