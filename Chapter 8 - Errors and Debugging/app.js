// actual server bnany ka jo main kam hy wo app.js mai 
/// hona chahiye
const http = require('http');
const testingSyntax = require('./syntax');
const runtime = require('./runtime');
const logical = require('./logical');
// Http module to export kia hy
// Yhan pr is bat ko make sure krna hy k jo module import kia hy is case mai
// './user' hy isko hi createServer mai pass krna hy
const server = http.createServer((req, res) => {
  console.log(req.yrl , req.method);
  // testingSyntax();
  // runtime();
  logical();
});

const PORT = 3002;
server.listen(PORT , () => {
console.log(`Server is listening on http://localhost:${PORT}`)
});

// terminal mai bhi app.js wali file ko run kryn gy
