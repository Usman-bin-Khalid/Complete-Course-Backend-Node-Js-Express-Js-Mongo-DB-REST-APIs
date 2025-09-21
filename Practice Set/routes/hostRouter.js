// Core Module
const path = require("path"); // Html ki file ka path deny ky liy
// Local Module
const rootDir = require("../utils/pathUtils");
const express = require("express");
const hostRouter = express.Router(); // Express ka aik apna Router function hy

hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method);

  res.render('addHome');
});

const registeredHome = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log("Home Registration Successfull" , req.body,);
  registeredHome.push({houseName : req.body.houseName, price : req.body.price, location : req.body.location, rating : req.body.rating, photo : req.body.photoUrl});

  res.render('homeAdded');
});

exports.hostRouter = hostRouter;
exports.registeredHome = registeredHome;