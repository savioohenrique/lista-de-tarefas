var http = require('http');
var fs = require('fs');
var url = require('url');

// Cria o servidor
http.createServer( function (req, res) {  
   var q = url.parse(req.url, true);
   var filename = "." + q.pathname;

   // Mensagem de log com o nome do arquivo
   console.log("Request for " + filename + " received.");

   fs.readFile(filename, function(err, data) {
      if (err) {
         res.writeHead(404, {'Content-Type': 'text/html'});
         return res.end("404 Not Found");
      } 
      res.writeHead(200, {'Content-Type': 'text/html','Access-Control-Allow-Origin':'*'});
      res.write(data);
      return res.end();
   });
   
   
}).listen(8080);
// Mensagem para indicar o início do servidor
console.log('Server running at localhost:8080/ ...');