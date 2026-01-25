const express = require("express");
const app = express();
app.use(express.json());
const notes =[];
app.get("/notes",(req,res)=>{
    res.send(notes);
});

app.post("/notes",(req,res)=>{
    console.log(req.body);
   notes.push(req.body);
   console.log(notes);
   res.send("notes created successfully");
});
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.send("note deleted successfully");
    console.log(notes);
})

app.patch("/notes/:index",(req,res)=>{
     notes[req.params.index].description = req.body.description;
    res.send("Data updated successfully");
    console.log(notes);
})
module.exports = app;
