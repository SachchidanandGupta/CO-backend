const express = require("express");
const app = express();
app.use(express.json()); // express is not capable of reading the data so we use this to change the JSON into readable format
const notes = [];
app.post("/notes",(req,res) =>{
 console.log(req.body); // used for dealing with frontend data body found in the postman req.body
 notes.push(req.body);
   res.send("Note created");  
})
app.get("/notes",(req,res)=>{
    res.send(notes)
})
app.listen(3000,() => {
    console.log("Server is running on port 3000");
});