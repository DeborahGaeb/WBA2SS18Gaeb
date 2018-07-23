//Einbindung von EXPRESS
var express = require('express');
var reitstallRouter = express.Router();

//Einbindung von Body-Parser und Implementierung von JSON- Parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
reitstallRouter.use(bodyParser.json());

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();

/*********************************************************************************************************************
 *  Ein Reitstall kann verschiedene Räumlichkeiten haben, Gräte und Möglichkeiten haben. 
 *  Der Besitz von Pferden heißt Verantowrtung übernehmen und sich jeden Tag um das Pferd zu kümmern
 *  oder Leute/ Freunde/ Reitbeteiligungen zu haben. Deshalb sind Gebäude wie eine Reithalle, eine Longierhalle intereesant.
 *  Auch die Möglickeit zu haben Reiten zu können im Wald oder auf dem Gelände ist wichtig.
 *  Das Reitstübchen ist bei Kaltem Wetter toll zum Aufwärmen im Winter super oder zum zusammen sein.
**********************************************************************************************************************/

reitstallRouter.post('/reitstall', function(req, res){
    var reitstall = req.body;
    client.incr('nextReitstallID', function(err, rep){
        reitstall.id = rep;
        reitstall.email = rep;
        reitstall.passwort = rep;
        reitstall.vorname = rep;
        reitstall.nachname = rep;
        reitstall.nameStall = rep;
        reitstall.stasse = rep;
        reitstall.hausnummer = rep;
        reitstall.plz = rep;
        reitstall.stadt = rep;
        reitstall.telefon = rep;
        reitstall.webadresse = rep;
        reitstall.twitter = rep;
        reitstall.instgramm = rep;
        reitstall.facebook = rep;
        reitstall.haltung = rep;
        reitstall.reithalle = rep;
        reitstall.weideKoppel = rep;
        reitstall.paddock = rep;
        reitstall.fuehranlage = rep;
        reitstall.springplatz = rep;
        reitstall.laufband = rep;
        reitstall.roundpan = rep;
        reitstall.longierhalle = rep;
        reitstall.gelaendestreckeGelaendehinternisse = rep;
        reitstall.sandbahn = rep;
        reitstall.reitwege = rep;
        reitstall.waschplatz = rep;
        reitstall.solarium = rep;
        reitstall.haengerstellplatz = rep;
        reitstall.stuebchen = rep;
        reitstall.putzplatz = rep;
        reitstall.reitschule = rep;
        reitstall.waschmaschine = rep;
        reitstall.freieBoxen = [];
        reitstall.lehrgang = [];
        reitstall.turnier = [];
        client.set('reitstall: ' + reitstall.id, JSON.stringify(reitstall), function(err,rep){
            res.json(reitstall);
        });
    });
});

//Alle Reitställe auflisten
reitstallRouter.get('/reitstall', function(req, reply){
    client.get('reitstall', function(err, rep) {
        res.send(JSON.parse(rep));
  });
});

reitstallRouter.get('/reitstall/:id', function(req, res){
    client.get('reitstall: ' + req.params.id, function(err, rep){
        if(rep){
            res.status(200).type('json').send(rep);
        } else {
            res.status(400).type('text').send('Der Reitstall mit der ID: ' + req.params.id + 'gibt es nicht');
        }
    });
});

reitstallRouter.delete('/reitstall/:id', function(req, res){
    client.get('reitstall: ' + req.params.id, function(err, rep){
        var freieBoxen = JSON.parse(rep).freieBoxen;
        for(var i = 0; i < freieBoxen.length; i++) 
            client.del('freieBoxen: ' + freieBoxen[i]);
        reitstaelle.freieBoxen.forEach(function(id){
            client.del('freieBoxen:'+ id);
        });
        client.del('reitstall: ' + req.params.id, function(err, rep){
            if(reply == 1){
                res.status(200).type('text').send('Der Reitstall wurde mit der ID ' + req.params.id + ' gelöscht.');
            } else {
                res.status(404).type('text').send('Der Reitstall mit der ID ' + req.params.iid + ' existiert nicht.'); 
            }
        });
    });
});

//Überschreiben eines Reitstalls
reitstallRouter.put('reitstall/:id', jsonParser, function(req, res){
    var neu = req.body;
    neu.id = req.params.id;

    client.set('reitstall:' + req.params.id, JSON.stringify(neu), function(err, reply){
        res.status(200).type('json').send(neu);
    });
});

module.exports = reitstallRouter;