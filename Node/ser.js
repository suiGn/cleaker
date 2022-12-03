var http = require('http');
var server = http.createServer(function(request, response)){
    response.end('hello world');
    console.log('do somethin');
    setTimeout(function() { async('later;');}, 3000);
    function async(arg){
        console.log('do somethin' + arg);
    }
});
server.listen(80);