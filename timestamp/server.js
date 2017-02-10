var express = require('express')

var app = express()

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    console.log("Connected: /");
    res.render('index.html');
})

app.get('/:date', function (req, res) {
    console.log("Connected: /" + req.params.date);
    var data = req.params.date;
    var resp = {};
    if (  ehNumero( data ) ) {
        resp.unix = data;
        resp.natural = montarData(data);
    } else {
        resp.unix = Date.parse(data);
        resp.natural = data;
        if ( isNaN(resp.unix) ) {
            resp.unix = null;
            resp.natural = null;
        }
    }
    
    res.send(resp);
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

function ehNumero( num ) {
    return num - parseFloat( num ) >= 0;
}

function montarData( unix ) {
    var d = new Date(parseInt(unix));
    
    var mes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dia = String(d.getDate());
    var ano = String(d.getFullYear());
    
    return mes[ d.getMonth() ] + " " + dia + ", " + ano;
}