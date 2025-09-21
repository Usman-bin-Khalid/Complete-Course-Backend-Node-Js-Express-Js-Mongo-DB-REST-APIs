// const http = require('http');

// const server = http.createServer((req, res) => {
//   console.log('Request received');
//   res.end('Hello from server!');
// });

// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req);
  /// process.exit() lgany sy jesy hi server ko first request milay gi usky bd server ko band kr de ga
  // process.exit();
  
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`);
  
});




