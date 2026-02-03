const express = require("express");
const app = express();
app.use(express.json());
const noteModel = require("./models/notes.model");
app.post("/api/notes",async(req,res)=>{
    const {title,description} = req.body;
    const notes = await noteModel.create({
        title,description
    });
    res.status(201).json({
        message:"Notes created successfully.",
        notes
    })
});
app.get("/api/notes",async(req,res) =>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"Data fetched Successfully.",
        notes
    })
});
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message:"Notes deleted successfully."
    })
})
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;
    await noteModel.findByIdAndUpdate(id,{description});
    res.status(200).json({
        message:"note updated successfully"
    })
})
module.exports = app;