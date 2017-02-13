var express = require("express");

var app = express();
app.get("/", function(req, res) {
    var mongo = require('mongodb').MongoClient
    
    var doc = {
      _id: 0,
      url: "https://github.com/rkaustchr/freeCodeCamp"
    }
    
    var url = 'mongodb://localhost:27017/url_shortner'
    mongo.connect(url, function(err, db) {
      if (err) throw err
      var collection = db.collection('urls')
      collection.insert(doc, function(err, data) {
        if (err) throw err
        console.log(JSON.stringify(doc))
        db.close()
      })
    });
    
      
    doc = {
      _id: "urls",
      count: 0
    }
    
    mongo.connect(url, function(err, db) {
      var collection = db.collection('counters')
      collection.insert(doc, function(err, data) {
        if (err) throw err
        console.log(JSON.stringify(doc))
        db.close()
      })
    })
    
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