// Core Module

const path = require('path'); // HTML ki file ko import krny ky liy

// External Module
const express = require("express");
const { registeredHome } = require('./hostRouter');
// Express Router
const userRouter = express.Router();

userRouter.get("/", (req, res, next) => {
  res.render('home' , {registeredHome : registeredHome});
  console.log(registeredHome);
});

module.exports = userRouter;
