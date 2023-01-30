console.log("Starting cleaker:");
const details = require('./methods/details');
//const method = require('./methods/methods');

//Node Requires.
const fs = require('fs');
var http = require('http');
var os = require("os");


let port = process.env.PORT;
var host = os.hostname();
if (port == null || port == "") {
  port = 8000;
}


var httpServer = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});


httpServer.listen(port, function() {
    console.log("Cleaker webServer On Host: " + host +  " && Port: " + port);
});
 