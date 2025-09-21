// actual server bnany ka jo main kam hy wo app.js mai 
/// hona chahiye
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
});

const PORT = 3002;
server.listen(PORT , () => {
console.log(`Server is listening on http://localhost:${PORT}`)
});

// terminal mai bhi app.js wali file ko run kryn gy
