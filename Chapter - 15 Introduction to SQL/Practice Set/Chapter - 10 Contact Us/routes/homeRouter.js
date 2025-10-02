// Core Module
const path = require('path');
// External Module
const express = require('express');
// Local Module
const rootDir = require('../utils/pathUtils');

const homeRouter = express.Router();

homeRouter.get('/' , (req, res , next) => {
 console.log("Handling for Get", req.url, req.method);
 res.sendFile(path.join(rootDir, 'views' , 'home.html'));
});

module.exports = homeRouter;