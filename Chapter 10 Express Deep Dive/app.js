const http = require("http");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);

app.use((req, res, next) => {
  console.log("First Middle ware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Second Middle Ware", req.url, req.method);
  next();
});
// app.use((req, res, next) => {
//  console.log('Third Middle Ware' , req.url , req.method);
//  res.send('<h1>Welcome to Complete Coding</h1>')
// });

app.get("/", (req, res, next) => {
  console.log("Handling / for get", req.url, req.method);
  res.send(`Welcome to Code With Usman`);
});

app.get("/contact-us", (req, res, next) => {
  console.log("Handling contact us for Get");
  res.send(`<h1>Please Give Your Details Here</h1>
  <form method = "POST" action = "/contact-us">
  <input type = "text" name = "name" placeholder = "Enter Your Name" />
  <input type = "email" placeholder ="Enter Your Email" name = "email" />
  <input type = "Submit" />
  </form>`);
});


app.post('/contact-us',(req ,res, next) => {
  console.log('First Handling', req.url, req.method , req.body);
 next();

});
// Phly jo hum chunk, buffer or body ko parse krty thy
//ab wo simplye is below wali line ky zriye ho jai ga
app.use(bodyParser.urlencoded());
// Aik hi path pr different different methods sy alg alg rounting kr skty hyn
app.post('/contact-us',(req ,res, next) => {
  console.log('Handling Contact Us for POST', req.url, req.method , req.body);
  res.send('<h1>We will contact you shortly</h1>');

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
