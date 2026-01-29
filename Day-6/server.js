const app = require('./src/app');
const mongoose = require('mongoose');
require('dotenv').config();
 
function connnectToDb(){
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log("Connected to Database");
    }).catch((err)=>{
        console.log("Connection Failed!");
    });
}
connnectToDb();


app.listen(3000,()=>{
    console.log("sever is running at port 3000");
})