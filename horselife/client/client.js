var faye = require('faye');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var ejs = require('ejs');
var fs = require('fs');

//Server erstellen
var app = express();
var server = http.createServer(app);
app.use(bodyParser.json());

app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - not found');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - internal error');
});


//Adapter konfigurieren
var bayeux = new faye.NodeAdapter({
    mount: '/faye'
}); 

//Adapter zum Server hinzufügen
bayeux.attach(server);

var client = new faye.Client("http://localhost:8000/faye");

var lehrgang = client.subscribe('/lehrgang', function(message){
    console.log("Neuer Lehrgang" + JSON.stringify(message.ReitstallID));
    var options = {
        host: 'localhost', 
        port: '3000', 
        path: '/lehrgang',
        methode: 'POST'
    };
    var externalRequest = http.request(options, function (externalResponse) {
        console.log('Artikel erstellt');
        externalResponse.on("data", function (chunk) {
            console.log("body: " + chunk);
        });
    });
    externalRequest.setHeader("content-type", "application/json");
    externalRequest.write(JSON.stringify(message));
    externalRequest.end();
});

//Post auf die Ressource Lehrgang
app.post('/lehrgang', function(req, res){
    var newLehrgang = JSON.stringify(req.body);
    console.log("Neuer Lehrgang:  " + JSON.stringify(newLehrgang.userID));
    var options = {
        host: 'localhost',
        port: '3000',
        path: '/lehrgang',
        method: 'POST'
    };
    var externalRequest = http.request(options, function(externalResponse){
        console.log('Lehrgang wurde erstellt. ');
        externalResponse.on("data", function(chunk){
            console.log('Body: ' + chunk);
            reitstall = JSON.parse(chunk);
            
            res.json(newLehrgang);
            res.end();
        });
    });
    externalRequest.setHeader("content-type", "application/json");
    externalRequest.write(JSON.stringify(newLehrgang));
    externalRequest.end();
});

//Get auf Ressouce article

app.get('/lehrgang/:id', jsonParser, function(req, res){
    var options = {
        host: 'localhost',
        port: '3000',
        path: '/lehrgang',
        method: 'GET'
    };
    var externalRequest = http.request(options, function(externalResponse){
        console.log('Lehrgang nach Id');
        externalResponse.on('data', function(chunk) {
            var lehrgangNachID = JSON.parse(chunk);

            res.json(lehrgang);
            res.end();
        });
    });
    externalRequest.setHeader("content-type", "text/plain");
    externalRequest.end();
});

server.listen(8000, function () {
    console.log("Server listens on Port 8000");
});
