// Core Module ('http')
const http = require('http');
// External Module ('Express.js')
const express = require('express');
// Local Module ('./user')
// const requestHandler = require('./user');

const app = express();
// Adding middleware
app.get("/", (req, res , next) => {
  console.log("Came in first middleware" ,req.url, req.method);
  // Agr next nhi lgayn gy to sirf first wali middleware call hogi or 
  // remaining all middlewares call nhi hon gi
  // next();
   
  next();
});
app.post("/save-bio" , (req, res, next) => {
 console.log("Came in submit details", req.url, req.method);
 res.send("<p>Welcome to submit details</p>");
});




app.use("/", (req, res, next) => {
 console.log('Came in third middleware' , req.url, req.method);
 res.send(`<p>Third middleware starts</p>`);
});
const server = http.createServer(app);



const PORT = 3002;
server.listen(PORT , () => {
console.log(`Server is listening on http://localhost:${PORT}`)
});

