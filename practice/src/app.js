const express = require("express");
const app = express();
app.use(express.json());
const noteModel = require("./models/note.model");
app.post("/notes",async (req,res)=>{
    const {title,description} = req.body;
    const notes = await noteModel.create({
        title,description
    });
    res.status(200).json({
        message:"notes created successfully",
        notes
    });
}) 
module.exports = app;