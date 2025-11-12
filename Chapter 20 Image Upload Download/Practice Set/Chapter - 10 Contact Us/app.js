// Core Module ('http')
const http = require('http');
// External Module ('Express.js')
const express = require('express');
// Local Module ('./user')
// const requestHandler = require('./user');
const homeRouter = require('./routes/homeRouter');
const contactRouter = require('./routes/contactRouter');
const app = express();
app.use(express.urlencoded());
app.use(homeRouter);
// Adding middleware

app.use(contactRouter);


const PORT = 3002;
server.listen(PORT , () => {
console.log(`Server is listening on http://localhost:${PORT}`)
});

