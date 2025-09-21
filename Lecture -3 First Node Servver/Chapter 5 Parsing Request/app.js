// actual server bnany ka jo main kam hy wo app.js mai 
/// hona chahiye
const http = require('http');
const requestHandler =  require('./user');
const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT , () => {
console.log(`Server is listening on http://localhost:${PORT}`)
});

// terminal mai bhi app.js wali file ko run kryn gy
