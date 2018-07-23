//Einbindung von EXPRESS
var express = require('express');
var wunschStallRouter = express.Router();

//Einbindung von Body-Parser und Implementierung von JSON- Parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
wunschStallRouter.use(bodyParser.json());

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();

wunschStallRouter.post('/wunschStall', function(req, res){
    var newWunschStall = req.body;
    client.incr('nextwunschStallId', function(err, rep){
        newWunschStall.id = rep;
        newWunschStall.haltung = rep;
        newWunschStall.reithalle = rep;
        newWunschStall.weideKoppel = rep;
        newWunschStall.paddock = rep;
        newWunschStall.fuehranlage = rep;
        newWunschStall.springplatz = rep;
        newWunschStall.laufband = rep;
        newWunschStall.roundpan = rep;
        newWunschStall.longierhalle = rep;
        newWunschStall.gelaendestreckeGelaendehinternisse = rep;
        newWunschStall.sandbahn = rep;
        newWunschStall.reitwege = rep;
        newWunschStall.waschplatz = rep;
        newWunschStall.solarium = rep;
        newWunschStall.haengerstellplatz = rep;
        newWunschStall.stuebchen = rep;
        newWunschStall.putzplatz = rep;
        newWunschStall.reitschule = rep;
        newWunschStall.waschmaschine = rep;
        client.set('wunschStall: ' + newWunschStall.id, JSON.stringify(newWunschStall), function(err,rep){
            res.json(newWunschStall);
        });
    });
});

wunschStallRouter.delete('/wunschStall/:id', function(req, res){
    client.get('Wunschstall: ' + req.params.id, function(err, rep){
        client.del('wunschStall: ' + req.params.id, function(err, rep){
            if(reply == 1){
                res.status(200).type('text').send('Der WunschStall wurde mit der ID ' + req.params.iid + ' gelöscht.');
            } else {
                res.status(404).type('text').send('Der Reitstall mit der ID ' + req.params.iid + ' existiert nicht.'); 
            }
        });
    });
});

module.exports = wunschStallRouter;