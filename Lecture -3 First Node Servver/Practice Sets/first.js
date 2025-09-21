const http = require('http');
const server = http.createServer((req , res) => {
console.log(req.url, req.method);
if(req.url === '/home'){
  res.write('<html><h1>Welcome to Home</h1></html>');
  return res.end();
}else if (req.url === '/man') {
  res.write('<html><h1>Welcome to Man</h1></html>');
  return res.end();
}else if (req.url === '/woman') {
   res.write('<html><h1>Welcome to Woman</h1></html>');
   return res.end();
}else if(req === '/kids') {
  res.write('<html><h1>Welcome to Kids</h1></html>');
return res.end();
}else if(req.url === '/carts') {
  res.write('<html><h1>Welcome to Carts</h1></html>');
  return res.end();
}
res.write(`
  <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Myntra</title>
</head>
<body>
  <head>
    <nav>
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/man">Man</a></li>
        <li><a href="/woman">Woman</a></li>
        <li><a href="/kids">Kids</a></li>
        <li><a href="/carts">Cart</a></li>
      </ul>
    </nav>
</body>
</html>`);
return res.end();


});

server.listen(3000, () => {
console.log(`Server is listening on http://localhost:3000`);
});