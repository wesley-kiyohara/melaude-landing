var express = require('express');
var http = require('http');

var app = express(); 
var server = http.createServer(app);
var port = parseInt(process.env.PORT, 10) || 8000;

app.get("/", function (req, res) {
  res.redirect("index.html");
});

app.use(express.static(__dirname));

app.listen(port);

console.log('Express server started on port %s\n', 8000);
console.log('Press Ctrl + C to stop.');