const express = require("express");

const app = express();

app.use(express.json());

const cookieParser = require("cookie-parser");

app.use(cookieParser());

const authRouter = require("./routes/auth.routes");

app.use("/api/auth",authRouter);

const postRouter = require('./routes/post.routes');

app.use("/api/post",postRouter);
module.exports = app;