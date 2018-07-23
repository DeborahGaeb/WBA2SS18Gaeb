//Einbindung von EXPRESS
var express = require('express');
var lehrgangRouter = express.Router();

//Einbindung von Body-Parser und Implementierung von JSON- Parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
lehrgangRouter.use(bodyParser.json());

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();

lehrgangRouter.post('/reitstall/:id/lehrgang', function(req, res){
    var newLehrgang = req.body;

    client.incr('/:id/nextLehrgangID', function(err, rep){
        newLehrgang.id = rep;

        client.set('Lehrgang: ' + newLehrgang, JSON.stringify(newLehrgang), function(err, rep){
            client.get('Reitstall: ' + newLehrgang.reitstallID, function(err, rep){
                var reitstaelle = JSON.parse(rep);
                reitstaelle.lehrgangID.push(newLehrgang.id);
                client.set('Reitstall: ' + newLehrgang.id, JSON.stringify(newLehrgang), function(err, rep){
                    res.json(newLehrgang)
                });
            });
        });
    });
});

//Alle Lehrgänge Anzeigen. 
lehrgangRouter.get('/:id/lehrgang', function(req, res){
    client.get('reiter', function(err, rep) {
        res.send(JSON.parse(rep));
    });
});


//Einen Lehrgang abfragen
lehrgangRouter.get('/:id/lehrgang/:id', function(req, res){
    client.get('Lehrgang ' + req.params.id, function(err, rep){
        if(reply){
            res.status(200).type('json').send(rep);
        } else {
            res.status(404).type('text').send('Die Lehrgang mit der ID ' + req.params.id + 'exstiert nicht');
        }
    });
});

lehrgangRouter.put('/:id/lehrgang/:id', jsonParser, function (req, res) {
    var neu = req.body;
    neu.id = req.params.id;

    client.set('Lehrgang:' + req.params.id, JSON.stringify(neu), function (err, rep) {
        res.status(200).type('json').send(neu);
    });
});

//löschen einer Lehrgangs
lehrgangRouter.delete('/:id/lehrgang/:id', function(req, res){
    client.get('Lehrgaenge: ' + req.params.id, function(err, rep){
        var freieBox = JSON.parse(rep);
        client.get('Reitstall: ' + reitstall.id, function(err, rep){
            var reistall = JSON.parse(rep);
            reitstall.lehrgang = reitstall.lehrgang.filter((value) => value != freieBox.id);
            client.set('Reitstall: ' + reistall.id, JSON.stringify(reitstall), function(err, rep){
                if (rep == 1) {
                    res.status(200).type('text').send('Der Lehrgang mit der ID: ' + req.params.id + ' wurde erfolgreich gelöscht');
                } else {
                    res.status(404).type('text').send('Die Lehrgang mit der ID ' + req.params.id + ' existiert nicht');
                }
            });
        });
    });
});

module.exports = lehrgangRouter