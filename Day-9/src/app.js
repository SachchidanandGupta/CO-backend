const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const authRouter = require("./routes/auth.routes");
app.use("/api/auth",authRouter) // this work as middleware so that we can use the auth api teh api url is /api/auth/register
module.exports = app;
