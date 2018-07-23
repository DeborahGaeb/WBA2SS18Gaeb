//Einbindung von EXPRESS
var express = require('express');
var freieBoxenRouter = express.Router();

//Einbindung von Body-Parser und Implementierung von JSON- Parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
freieBoxenRouter.use(bodyParser.json());

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();

/******************************
 * Freie Boxen: 
 * Eine freie Box gehört einen Reitstall an. Diese freie Box hat eine Größe.
 * Die Größe ist wichtig um zu überprüfen, ob eine Pferd in dieser Box passt. (Tierschutzgesätz)
 * Die Nachtbarn Rechts und Links sind ebenfalls wichtig, da ein Pferd Hör-, Sicht- und Geruchkontakt 
 * zu einem anderen Pferd, Pony, Esel, Maultier oder Maulesel haben. Außerdem, je nach Geschlecht und Wesen des 
 * eigenen Pferdes kann die Boxenwahl dadurch eingeschränkt werden. Ein Hengst kann nicht neben Stuten gestellt werden. 
 **********************************/

freieBoxenRouter.post('/reitstall/:id/freieBoxen', function(req, res){
    var newFreieBoxen = req.body;
    client.incr('nextFreieBoxID', function(err, rep){
        newFreieBoxen.id = rep;
        newFreieBoxen.groesse = rep;
        newFreieBoxen.nachbarlinks = rep;
        newFreieBoxen.nachbarRechts = rep;
        newFreieBoxen.geeignetFuer = rep;
        client.set('freieBox: ' + newFreieBoxen, JSON.stringify(newFreieBoxen), function(err, rep){
            client.get('Reitstall: ' + newFreieBoxen.freieBoxenID, function(err, rep){
                var reitstaelle = JSON.parse(rep);

                reitstaelle.freieBoxen.push(newFreieBoxen.id);
                client.set('Reitstall: ' + reitstaelle.id, JSON.stringify(reitstaelle), function(err, rep){
                    res.json(newFreieBoxen)
                });
            });
        });
    });
});

//Alle Boxen ausgeben
freieBoxenRouter.get('/reitstall/:id/freieBoxen', function(req, res){
    client.get('freieBoxen', function(err, rep) {
        res.send(JSON.parse(rep));
      });
});

//Eine freie Box abfragen
freieBoxenRouter.get('/reitstall/:id/freieBoxen/:id', function(req, res){
    client.get('freie Box ' + req.params.id, function(err, rep){
        if(rep){
            res.status(200).type('json').send(rep);
        } else {
            res.status(404).type('text').send('Die freie Box mit der ID ' + req.params.id + 'exstiert nicht');
        }
    });
});

freieBoxenRouter.put('/reitstall/:id/freieBoxen/:id', jsonParser, function (req, res) {
    var neu = req.body;
    neu.id = req.params.id;

    client.set('freie Box:' + req.params.id, JSON.stringify(neu), function (err, rep) {
        res.status(200).type('json').send(neu);
    });
});

//löschen einer freien Boxen
freieBoxenRouter.delete('/reitstall/:id/freieBoxen/:id', function(req, res){
    client.get('FreieBoxen: ' + req.params.id, function(err, rep){
        var freieBox = JSON.parse(rep);
        client.get('Reitstall: ' + reitstall.id, function(err, rep){
            var reistall = JSON.parse(rep);
            reitstall.freieBox = reitstall.freieBox.filter((value) => value != freieBox.id);
            client.set('Reitstall: ' + reistall.id, JSON.stringify(reitstall), function(err, rep){
                if (rep == 1) {
                    res.status(200).type('text').send('Die freie Box mit der ID: ' + req.params.id + ' wurde erfolgreich gelöscht');
                } else {
                    res.status(404).type('text').send('Die freie Box mit der ID ' + req.params.id + ' existiert nicht');
                }
            });
        });
    });
});

module.exports = freieBoxenRouter;