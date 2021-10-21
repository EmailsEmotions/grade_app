const http = require('http');
const fs = require('fs');

const port = 8080;

const server = http.createServer((req, res) => {
  let requestedFile = `${__dirname}/dist${req.url}`;

  if (req.url === '/') {
    requestedFile = `${__dirname}/dist/index.html`;
  }

  fs.readFile(requestedFile, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(port);
console.log(`Server is listening on port ${port}`);
