const http = require('http');
const port = process.env.PORT || 3000;

const handler = (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Jenkins Docker Pipeline Demo - Running Successfully!");
};

http.createServer(handler).listen(port, () => {
  console.log("Server started on port " + port);
});
