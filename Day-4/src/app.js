const express = require("express");
const app = express();
app.use(express.json());
const notes = [

];

app.get("/notes",(req,res)=>{
    res.send(notes);
})
app.post ("/notes",(req,res)=>{
    
    console.log(req.body);
    notes.push(req.body);
    res.send("notes created");
    console.log(notes);
})
// params is used to identify the index as only deals with single not with complete data like body so insted of req.body we use req.params 
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.send("node deleted successfully");
    console.log(notes);
})
// point to rememeber is that the params works with : the semi colon is important and the description that we changed here is wriiten on the req.body part on the postman
app.patch("/notes/:index",(req,res)=>{
     notes[req.params.index].description = req.body.description;
     res.send("description modified successfully");
     console.log(notes);
})
module.exports = app;