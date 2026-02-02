const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    title:String,
    description:String
});
const noteModel = mongoose.model("notes",noteSchema); // the string "notes" is known as collection
module.exports = noteModel;