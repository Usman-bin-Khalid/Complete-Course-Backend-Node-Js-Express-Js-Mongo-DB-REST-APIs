// Core Module
const path = require("path"); // Html ki file ka path deny ky liy
// Local Module
const rootDir = require("../utils/pathUtils");
const express = require("express");
const hostRouter = express.Router(); // Express ka aik apna Router function hy

hostRouter.get("/add-home", (req, res, next) => {
  console.log(req.url, req.method);

  res.sendFile(path.join(rootDir, "views", "addHome.html"));
});
hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.url, req.method, req.body);

  res.sendFile(path.join(rootDir, "views", "homeAdded.html"));
});

module.exports = hostRouter;
