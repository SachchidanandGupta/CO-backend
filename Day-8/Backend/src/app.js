const express = require('express');
const noteModel = require('./models/notes.model');
const app = express();
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
module.exports = app;