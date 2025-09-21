// Core Module

const path = require('path'); // HTML ki file ko import krny ky liy
// Local Module
const rootDir = require('../utils/pathUtils'); 
// External Module
const express = require("express");
// Express Router
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir,  'views' , 'home.html'));
});

module.exports = userRouter;
