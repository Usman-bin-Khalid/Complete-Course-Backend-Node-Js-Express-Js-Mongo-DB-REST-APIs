

// External Module
const express = require("express");

// Express Router
const authRouter = express.Router();

// Controllers ky liy export
const authController = require("../controllers/authController");
authRouter.get("/login", authController.getLogin);
authRouter.post('/login' , authController.postLogin);
authRouter.post('/logout', authController.postLogout);
authRouter.get('/signup' , authController.getSignup);
authRouter.post('/signup', authController.postSignup);



module.exports = authRouter;
