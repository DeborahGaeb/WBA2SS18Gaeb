//Einbindung von EXPRESS
var express = require('express');
var pferdeRouter = express.Router();

//Einbindung von Body-Parser und Implementierung von JSON- Parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
pferdeRouter.use(bodyParser.json());

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();

/******************************************************************************
 * Das Pferd ist das wichtigste für den Reiter, 
 * das Pferd oder die Anzahl der Pferde ist wichtig für die freie Boxen suche.
 ******************************************************************************/

//Erstelle eine Pferd
pferdeRouter.post('/reiter/:id/pferde', function(err, rep){
    newPferd = rep.body;
    client.incr('nextPferdeID', function(err, rep){
        newPferd.id = rep;
        newPferd.name = rep;
        newPferd.geschlecht = rep;
        newPferd.groesse = rep;
    
        client.set('reiter: ' + newPferd.id, JSON.stringify(newReiter), function(err, rep){
            res.json(newPferd);
        });
    });
});
 

//Alle Pferde anzeigen.
pferdeRouter.get('/reiter/:id/pferde', function(req, res){
        client.get('pferde', function(err, rep) {
            res.send(JSON.parse(rep));
    });
});

//nach einem Pferd fragen
pferdeRouter.get('/reiter/:id/pferde/:id', function(req, res){

    client.get('Pferde' + req.param.id, function(err, rep){
       if(rep){
           res.status(200).type('json').send(rep); 
       } else {
           res.status(404).type('json').send('Das Pferd mit der ID ' + req.params.id + 'existiert nicht');
       }   
    });
});
//Ein Pferd wird geändert
pferdeRouter.put('/reiter/:id/pferde/:id', jsonParser, function(req, res){
    var neu = req.body;
    neu.id = req.params.id;

    client.set('pferde: ' + req.params.id, JSON.stringify(neu), function(err, rep){
        res.status(200).type('json').send(neu);
    });
});

pferdeRouter.delete('/reiter/:id/pferde/:id', function(req, res){
    
    client.get('pferde', + req.params.id, function(err, rep){
        var pferde = JSON.parse(rep);
        client.get('reiter: ' + pferde.reiterID, function(err,rep){
            var reiter = JSON.parse(reply);
            reiter.pferde = reiter.pferde.filter((value)=> value != pferde.id);
            client.del('pferde' + req.params.id, function(err, reply){
                if(reply == 1){
                    res.status(200).type('text').send('Das Pferd mit der ID' + req.params.id + 'wurde erfoldreich gelöscht');
                } else {
                    res.status(404).type('text').send('Der Pferd mit der ID' + rep.params.id + 'gibt es nicht.');
                }
            });
        });
    });
});

module.exports = pferdeRouter;