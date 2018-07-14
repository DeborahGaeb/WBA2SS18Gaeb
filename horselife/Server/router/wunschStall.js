//Einbindung von EXPRESS
var express = require('express');
var app = express();
var router = express.Router();

//Einbindung von Body-Parser und Implementierung von JSON- Parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(bodyParser.json());

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();


//TODO Reitstall, post, get, get:id, put, delet
app.post('/wunschStall', function(req, res){
    var newWunschStall = req.body;
    client.incr('nextwunschStallId', function(err, rep){
        newWunschStall.id = rep;
        client.set('wunschStall: ' + newWunschStall.id, JSON.stringify(newWunschStall), function(err,rep){
            res.json(newWunschStall);
        });
    });
});

app.delete('/wunschStall/:id', function(req, res){
    client.get('Wunschstall: ' + req.params.id, function(err, reply){
        client.del('wunschStall: ' + req.params.id, function(err, reply){
            if(reply == 1){
                res.status(200).type('text').send('Der WunschStall wurde mit der ID ' + req.params.iid + ' gelöscht.');
            } else {
                res.status(404).type('text').send('Der Reitstall mit der ID ' + req.params.iid + ' existiert nicht.'); 
            }
        });
    });
});

module.exports = router;