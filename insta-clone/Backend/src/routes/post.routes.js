const express = require("express");

const postRouter = express.Router();

postRouter.post("/",async(req,res)=>{
    const {caption, imgUrl , user} = req.body;

    
})

module.exports = postRouter;
