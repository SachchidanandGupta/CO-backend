const mongoose = require("mongoose");
require("dotenv").config();
function connectToDb(){
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("connected with database");
    }).catch((err)=>{
        console.log("connection failed");
    })
}
module.exports = connectToDb;