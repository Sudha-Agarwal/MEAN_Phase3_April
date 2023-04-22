"use strict";
exports.__esModule = true;
var http = require("http");
var host = 'localhost';
var port = 8000;
var requestListner = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end("My First server");
};
var server = http.createServer(requestListner);
server.listen(port, host, function () {
    console.log("server is running on ".concat(port));
});
