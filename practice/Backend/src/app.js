const express = require("express");
const app = express();
const cors = require("cors");
const noteModel = require("./models/notes.model");
app.use(cors());
app.use(express.json());
app.post("/api/notes",async(req,res)=>{
    const {title ,description } = req.body;
    const notes = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"note created successfully.",
        notes
    })
});
app.get("/api/notes",async(req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        message:"fetched data successfully.",
        notes
    })
});
app.delete("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(204).json({
        message:"note deleted successfully"
    })
});
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;
    await noteModel.findByIdAndUpdate(id,{description});
    res.status(200).json({
        message:"updated successsfully."
    })
})
module.exports = app;