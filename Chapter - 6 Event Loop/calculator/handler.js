const { request } = require('http');
const {sumRequestHandler} =  require('./sum');
const requestHandler = (req, res) => {
  console.log(req.url, req.method);
  if (req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Practice Set</title><head/>');
    res.write('<body><h1>Welcome to Calculator</h1><a href="/Calculator">Go to Calculator</a></body>');
    return res.end();

  }else if(req.url.toLowerCase() === '/calculator') {
    res.setHeader('Content-Type' , 'text/html');
    res.write(`<html><head></head><title></title>
      <body>
      <h1>Here is the Calculator</h1>
      <form method = "POST" action = "/calculate-result" >
      <input type = "text" name = "first" placeholder = "First num" />
      <input type = "text" name = "second" placeholder = "Second Num" />
      <input type = "submit" value = "Sum">
      </form>
      </body>
      </html>`);
      return res.end();
  }else if (req.url.toLowerCase() === '/calculate-result' && req.method === 'POST') {
  return sumRequestHandler(req, res);
    
// agr return nhi kryn gy to Page does not exist show hoga jo k nechy wali screen hy
  }
  res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Practice Set</title><head/>');
    res.write('<body><h1>Page does not exist</h1><a href="/">Go to home</a></body>');

    return res.end();

}
exports.requestHandler = requestHandler;