

// External Module
const express = require("express");

// Express Router
const authRouter = express.Router();

// Controllers ky liy export
const authController = require("../controllers/authController");
authRouter.get("/login", authController.getLogin);



module.exports = authRouter;
