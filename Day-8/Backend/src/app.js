const express = require('express');
const noteModel = require('./models/notes.model');
const cors = require("cors");
const path = require("path");
const app = express(); 
app.use(express.static("./Public")) // this static middleware take the public floderr and make it publically available 
app.use(cors());
app.use(express.json());
app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body;
    const notes = await noteModel.create({
        title,description
    });
    res.status(201).json({
        message:"notes created successfully",
        notes
    });
})
app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"data fetched successfully",
        notes
    })
})
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message:"note deleted successfully."
    })
})
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;
   await noteModel.findByIdAndUpdate(id,{description});
   res.status(200).json({
    message:"description updated successfully.",
   })
})
app.use("*name",(req,res)=>{  // the * is stands for wildcard this is used to handle the api request that isn't have been designed/created by the developer
   res.sendFile(path.join(__dirname,"..","/Public/index.html"));
})
module.exports = app;