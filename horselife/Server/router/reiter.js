//Einbindung von EXPRESS
var express = require('express');
var reiterRouter = express.Router();

//Einbindung von Body-Parser und Implementierung von JSON- Parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
reiterRouter.use(bodyParser.json());

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();

/*********************************************
 * Der Reiter ist die Zielperson des Systems.  
 ********************************************/

//Reiter angelegen. Ein Reiter ist wie der Reitstall eine User des Systems
reiterRouter.post('/reiter', function(req, res){
    var newReiter = req.body;
    client.incr('nextReiterID', function(err, rep){
        newReiter.id = rep;
        newReiter.name = rep;
        newReiter.straße = rep;
        newReiter.plz = rep;
        newReiter.stadt = rep;
        newReiter.pferde = [];
        client.set('Reiter: ' + newReiter.id,  JSON.stringify(newReiter), function(err, rep){
            res.json(newReiter);
        });
    });
});

//Alle Reiter auflisten
reiterRouter.get('/reiter', function(req, res){
    client.get('reiter', function(err, rep) {
        res.send(JSON.parse(rep));
      });
});

//Einen Reiter anzeigen
reiterRouter.get('/reiter/:id', function(req, res){
    client.get('Reiter: ' + req.param.id, function(err, rep){
        if(rep){
            res.type('json').send(rep);
        } else {
            res.status(404).type('text').send('Der Reiter mit der ID' + req.params.id + 'ist nicht vorhanden');
        }
    });
});

reiterRouter.delete('/reiter/:id', function(req, res){
    client.get('reiter: ' + req.params.id, function(err, rep){
        client.del('reiter: ' + req.params.id, function(err, rep){
            if(rep == 1){
                res.status(200).type('tet').send('Der Reiter mit der ID wurde erfolgreich gelöscht'+ req.params.id + 'gelöscht.');
            } else {
                res.status(404).type('text').send('Der Reiter mit der ID: ' + req.params.id + 'wurde nicht gelöscht.');
            }
        });
    });
});

//Überschreiben von Reiter
reiterRouter.put('/reiter/:id', jsonParser, function(req, res){
    var neu = req.body;
    neu.id = req.params.id;

    client.set('reiter: ' + req.params.id, JSON.stringify(neu), function(err, reply){
        res.status(200).type('json').send(neu);
    });
});
 
module.exports = reiterRouter;