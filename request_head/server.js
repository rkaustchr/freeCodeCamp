
var express = require('express');

var app = express();

app.get("/", function (req, res) {
    console.log(req.headers);
    var ip = req.headers['x-forwarded-for'];
    var lang = req.headers['accept-language'].split(",")[0];
    var system = req.headers['user-agent'].split("(")[1].split(")")[0];
    
    var obj = {"ipaddress": ip,"language": lang,"software": system };
    
    res.send( obj );
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

/*
{ host: 'free-code-camp-api-rkaustchr.c9users.io',
  'cache-control': 'max-age=0',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,* /*;q=0.8',
  'accept-encoding': 'gzip, deflate, sdch, br',
  'accept-language': 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4',
  'x-forwarded-proto': 'https',
  'x-forwarded-port': '443',
  'x-region': 'usw',
  'x-forwarded-for': '177.195.105.190',
  connection: 'keep-alive' }
 */
