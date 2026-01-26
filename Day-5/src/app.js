const express = require("express");
const app = express();
app.use(express.json());
const notes = [];
app.post("/notes",(req,res)=>{
    notes.push(req.body);
    res.status(201).json({
        message:"Notes created successfully"
    })
});
app.get("/notes",(req,res)=>{
    res.status(200).json({
        notes:notes
    })
});
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.status(204).json({            // with the code 204 the postman will not show any data 
        message:"notes deleted successfully"
    });
});
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description;
    res.status(200).json({
        message:"Description is updated"
    })
})
module.exports = app;