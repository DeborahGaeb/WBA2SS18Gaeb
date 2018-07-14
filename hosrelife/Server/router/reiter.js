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

/*************
 * Der Reiter ist die Zielperson des Systems.  
 */

//Reiter angelegen. Ein Reiter ist wie der Reitstall eine User des Systems
app.post('/', function(req, res){
    var newReiter = req.body; 
    client.incr('nextReiterID', function(req, res){
        newReiter.id = rep;
        newReiter.pferde = [];
        client.set('Reiter: ' + newReiter.id, JSON.stringify(newReiter), function(err, rep){
            res.json(newReiter);
        });
    });
});

//Alle Reiter auflisten
app.get('/', function(req, res){
    client.keys('reiter*', function(err, rep){
        var reiterinnen = [];
        if(rep.legth == 0) { 
            res.json(reiterinnen);
            return;
        } 
        
        client.mget(rep, function(err, rep){
            rep.forEach(function(val) {
                reiterinnen.push(JSON.parse(val));
            });
            reiterinnen = reiterinnen.map(function(reiter){
                return {id: reiter.id, name: reiter.name, strasseHNR: reiter.strasseHNR, plz: reiter.plz, stadt: reiter.stadt}; 
            });
            res.json(reiterinnen);
        });
    });
});
//Einen Reiter anzeigen
app.get('/:id', function(req, res){
    client.get('Reiter: ' + req.param.id, function(err, reply){
        if(reply){
            res.type('json').send(reply);
        } else {
            res.status(404).type('text').send('Der Reiter mit der ID' + req.params.id + 'ist nicht vorhanden');
        }
    });
});

app.delete('/:id', function(req, res){
    client.get('reiter: ' + req.params.id, function(err, reply){
        client.del('user: ' + req.params.id, function(err, reply){
            if(rep == 1){
                res.status(200).type('tet').send('Der Reiter mit der ID wurde erfolgreich gelöscht'+ req.params.id + 'gelöscht.');
            } else {
                res.status(404).type('text').send('Der Reiter mit der ID: ' + req.params.id + 'wurde nicht gelöscht.');
            }
        });
    });
});

//Überschreiben von Reiter
app.put('/:id', jsonParser, function(req, res){
    var neu = req.body;
    neu.id = req.params.id;

    client.set('user: ' + req.params.id, JSON.stringify(neu), function(err, reply){
        res.status(200).type('json').send(neu);
    });
});

//Erstelle eine Pferd
app.post('/pferde', function(req, res){
    newPferd = rep;
    client.incr('nextPferdeID', function(err, reply){
        newPferd.id = reply;
        client.set('pferde:' + newPferd.id, JSON.stringify(newPferd), function(err, rep){
            client.get('user: ' + newPferd.reiterID, function(err, rep){
                var reiter = JSON.parse(rep);
                user.pferde.push(newPferd.id);
                client.set('reiter: ' + reiter.id, JSON.stringify(reiter), function(err, reply){
                    res.json(newPferd);
                });
            });
        });
    });
});
/**********************
 * Das Pferd ist das wichtigste für den Reiter, 
 * das Pferd oder die Anzahl der Pferde ist wichtig für die freie Boxen suche.
 */
//Alle Pferde anzeigen.
app.get('/pferde', function(req, res){
    client.keys('pferde:*', function(req, res){
        var pferde = [];

        if(rep.legth == 0){
            res.json(pferde);
            return;
        }
        client.mget(rep, function(err, rep){
            replies.forEach(function(val){
                pferde.push(JSON.parse(val));
            });       
        });
        pferde = pferde.map(function(val){
            return {id: pferde.id, name: pferde.name, rasse: pferde.rasse, groesse: pferde.groesse};
        });
    });
});

//nach einem Pferd fragen
app.get('/pferde/:id', function(req, res){

    client.get('Pferde' + req.param.id, function(err, rep){
       if(rep){
           res.status(200).type('json').send(rep); 
       } else {
           res.status(404).type('json').send('Das Pferd mit der ID ' + req.params.id + 'existiert nicht');
       }   
    });
});
//Ein Pferd wird geändert
app.put('/pferde/:id', jsonParser, function(req, res){
    var neu = req.body;
    neu.id = req.params.id;

    client.set('pferde: ' + req.params.id, JSON.stringify(neu), function(err, rep){
        res.status(200).type('json').send(neu);
    });
});

app.delete('/pferde/:id', function(req, res){
    
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

module.exports = router;