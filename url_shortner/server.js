var express = require("express");

var app = express();

app.engine("html", require("ejs").renderFile);

app.get("/", function(req, res) {
    console.log("Connected: /");
    res.render("index.html");
});

app.get("/new/*", function(req, res){
    console.log("Connected: /new/");
    var url = req.url.split("/new/");
    url.splice(0,1);
    url = url.join("/new/");
    
    console.log("URL: " + url);
    
    var mongo = require('mongodb').MongoClient;
    var url_conn = 'mongodb://localhost:27017/url_shortner';
    
    mongo.connect(url_conn, function(err, db) {
        if (err) throw err

        var short = "";
        db.collection("counters").findAndModify( 
          { _id: "urls" }, null, { $inc: { seq: 1 } }, 
          function(err, result){
            if(err) throw err;
            short = result.value.seq;
            console.log("SHORT: " + short);
            db.collection('urls').insert({
                "_id": result.value.seq,
                "url": url
            });
            
            db.close();
            
            var resp = { "original_url" : url, "short_url" : "https://free-code-camp-api-rkaustchr.c9users.io/s/" + short };
            res.send( resp );
          });

    });
});

app.get("/s/*", function(req, res){
    console.log("Connected: /s/");
    var id = req.url.split("/s/");
    id.splice(0,1);
    id = id.join("/s/");
    
    console.log("ID: " + id);
    
    var mongo = require('mongodb').MongoClient;
    var url_conn = 'mongodb://localhost:27017/url_shortner';
    
    mongo.connect(url_conn, function(err, db) {
        if (err) throw err

        var short = "";
        
        db.collection('urls').find({
          "_id": +id
        }).toArray(function(err, documents) {
            console.log(documents);
            db.close();
            res.redirect(documents[0].url);
            res.end();
        });
    });    
});


app.listen("8080", function() {
    console.log("Connected to port 8080");
    console.log("initializing mongo ...");
    initMongo();
});

function initMongo () {
    var sys = require('sys')
    var exec = require('child_process').exec;
    var child;
    
    // executes `mongod`
    child = exec("./mongod", function (error, stdout, stderr) {
      sys.print('stdout: ' + stdout);
      sys.print('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });
}


