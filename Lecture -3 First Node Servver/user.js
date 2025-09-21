const http = require('http');
const fs = require('fs');
const { resourceLimits } = require('worker_threads');
const server = http.createServer((req, res) => {
 console.log(req.url, req.method, req.headers);
 if (req.url === '/') {
   res.setHeader('Content-Type', 'text/html');
 res.write('<html>');
 res.write('<head><title>Like</title></head>');
 res.write('<body><h1>Enter your details</h1>');
  res.write('<form action="/action-details" method="POST">');
  res.write('<input type= "text" name="username" placeholder="Enter your name">');
  res.write('<br><br>');
  res.write('<label for="male">Male</label>');
  res.write('<input type="radio" name="gender" value="male" id = "male" />');
  res.write('<label for="female">Female</label>');
  res.write('<input type="radio" name="gender" value="female" id="female" /><br></br>');
  res.write('<input type="Submit" value="Submit">')
  
  /// Name server pr data store krny ky liy helpful hy or usko acknowledge krny ky liy
  res.write('</form>');
  res.write('<form action="/save-bio" method="POST">');
 
  res.write('<input type="text" name="name" placeholder="Enter Your Name">');
  res.write('<br><br>');
  res.write('<input type="text" name="email" placeholder="Enter Your Email">');
  res.write('<br><br>');
  res.write('<input type="text" name="phone" placeholder="Enter Your Phone">');
  res.write('<br><br>');
  res.write('<input type="text" name="address" placeholder="Enter Your Address">');
  res.write('<br><br>');
  res.write('<input type="text" name="city" placeholder="Enter Your City">');
  res.write('<br><br>');
  res.write('<input type="text" name="country" placeholder="Enter Your Country">');
  res.write('<br><br>');
  res.write('<input type="text" name="zip" placeholder="Enter Your Zip Code">');
  res.write('<br><br>');
  res.write('<label for="male">Male</label>');
  res.write('<input type="radio" name="gender" value="male" id = "male">');

  res.write('<label for="Female">Female</label>');
  res.write('<input type="radio" name="gender" value="female" id="female">');
  res.write('<br><br>');
  res.write('<input type="submit" value="Submit">');
  res.write('</form>');
  
  res.write('</body>')
 res.write('</html>');
 return res.end();
 }else if(req.url === '/products'){
   res.setHeader('Content-Type', 'text/html');
 res.write('<html>');
 res.write('<head><title>Like</title></head>');
 res.write('<body><h1>Welcome to our products</h1></body>');
 res.write('</html>');
 return res.end();
 }else if(req.url.toLowerCase() === '/save-bio' && req.method === "POST") {
     
     fs.writeFileSync('user-data.txt', 'Usman Khalid');
     res.statusCode = 302; // Redirect status code
     res.setHeader('Location', '/');
     return res.end();
 }
 res.setHeader('Content-Type', 'text/html');
 res.write('<html>');
 res.write('<head><title>Like</title></head>');
 res.write('<body><h1>Like, Share, Subscribe</h1></body>');
 res.write('</html>');
 
 res.end();
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`);
});

