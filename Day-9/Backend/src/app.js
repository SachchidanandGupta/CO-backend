const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const noteModel = require("./models/notes.model");
app.post("/api/notes",async(req,res)=>{
    const {title, description} = req.body;
    const notes = await noteModel.create({
        title,description
    });
    res.status(201).json({
        message:"resource created successfully.",
        notes
    });
});
app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"Data fetched successdully.",
        notes
    });
});
app.delete("/api/notes/:id",async(req,res)=>{
    const noteId = req.params.id;
   await noteModel.findByIdAndDelete(noteId);
   res.status(200).json({
    message:"note deleted successfully."
   });
});
app.patch("/api/notes/:id",async(req,res)=>{
    const noteId = req.params.id;
    const {description} = req.body;
    await noteModel.findByIdAndUpdate(noteId,{
        description
    });
    res.status(200).json({
        message:"modified description founded"
    })
})

module.exports = app;