require('dotenv').config();
const app = require("./src/app");
const cors = require("cors");
cors();
const connectToDB = require("./src/config/database");
connectToDB();
app.listen(3000,()=>{
    console.log("server is running at port 3000");
})