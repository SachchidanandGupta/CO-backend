const express = require('express');

const authRouter = express.Router();

const authController = require("../controllers/auth.controller");


/**
 * @route POST /api/auth/register
 * @description to register an user 
 */
authRouter.post("/register",authController.registerController);

/**
 * @route POST /api/auth/login
 * @description to login user
 * 
 */
authRouter.post("/login",authController.loginController);

module.exports = authRouter;