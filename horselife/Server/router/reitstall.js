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

/***************************************
 *  Ein Reitstall kann verschiedene Räumlichkeiten haben, Gräte und Möglichkeiten haben. 
 *  Der Besitz von Pferden heißt Verantowrtung übernehmen und sich jeden Tag um das Pferd zu kümmern
 *  oder Leute/ Freunde/ Reitbeteiligungen zu haben. Deshalb sind Gebäude wie eine Reithalle, eine Longierhalle intereesant.
 *  Auch die Möglickeit zu haben Reiten zu können im Wald oder auf dem Gelände ist wichtig.
 *  Das Reitstübchen ist bei Kaltem Wetter toll zum Aufwärmen im Winter super oder zum zusammen sein.
*/

app.post('/reitstall', function(req, res){
    var newReitstall = req.body;
    client.incr('nextUserID', function(err, rep){
        newReitstall.id = rep;
        newReitstall.freieBoxen = [];
        newReitstall.lehrgang = [];
        newReitstall.turnier = [];
        client.set('user: ' + newReitstall.id, JSON.stringify(newReitstall), function(err,rep){
            res.json(newReitstall);
        });
    });
});

//Alle Reitställe auflisten
app.get('/reitstall', function(req, reply){
    client.keys('user:*', function(err, reply){
        var reitstaelle = [];
        if(reply.legth == 0){
            res.json(reitstaelle);
            return;
        }
        client.mget(reply, function(err, reply){
            reply.forEach(function(val){
                reitstaelle.push(JSON.parse(val));
            });
            reitstaelle = reitstaelle.map(function(reitstaelle){
                return {id: reitstaelle.id, username: Reitstall.username, email: reitstall.email, passwort: reitstall.passwort, vorname: reitstall.vorname,
                    nachname: reitstall.nachname, nameStall: reitstall.nameStall, strasse: reitstall.stasse, hausnummer: reitstall.hausnummer, plz: reitstall.plz, 
                    wohnort: reitstall.wohnort, telefon: reitstall.telefon, webadresse: reitstall.webadresse, twitter: reitstall.twitter,
                    instgramm: reitstall.instgramm, facebook: reitstall.facebook, haltung: reitstall.haltung, reithalle: reitstall.reithalle,
                    weideKoppel: reitstall.weideKoppel, paddock: reitstall.paddock, springplatz: reitstall.springplatz, fuehranlage: reitstall.fuehranlage,
                    laufband: reitstall.laufband, roundpan: reitstall.roundpan, longierhalle: reitstall.longierhalle, gelaendestreckeGelaendehinternisse: reitstall.gelaendestreckeGelaendehinternisse,
                    sandbahn: reitstall.sandbahn, reitwege: reitstall.reitwege, waschplatz: reitstall.waschplatz, putzplatz: reitstall.putzplatz,
                    solarium: reitstall.solarium, haengerstellplatz: reitstall.haengerstellplatz, stuebchen: reitstall.stuebchen,
                    reitschule: reitstall.reitschule, waschmaschine: reitstall.waschmaschine
                };
            });
            res.json(reitstaelle);
        });
    });
});

app.get('/reitstall/:id', function(req, res){
    client.get('Reitstall: ' + req.params.id, function(err, reply){
        if(reply){
            res.status(200).type('json').send(reply);
        } else {
            res.status(400).type('text').send('Der Reitstall mit der ID: ' + req.params.id + 'gibt es nicht');
        }
    });
});

app.delete('/reitstall/:id', function(req, res){
    client.get('Reistall: ' + req.params.id, function(err, reply){
        var freieBoxen = JSON.parse(reply).freieBoxen;
        for(var i = 0; i < freieBoxen.length; i++) 
            client.del('freieBoxen: ' + freieBoxen[i]);
        reitstaelle.freieBoxen.forEach(function(id){
            client.del('freieBoxen:'+ id);
        });
        client.del('user: ' + req.params.id, function(err, reply){
            if(reply == 1){
                res.status(200).type('text').send('Der Reitstall wurde mit der ID ' + req.params.iid + ' gelöscht.');
            } else {
                res.status(404).type('text').send('Der Reitstall mit der ID ' + req.params.iid + ' existiert nicht.'); 
            }
        });
    });
});

//Überschreiben eines Reitstalls
app.put('reitstall/:id', jsonParser, function(req, res){
    var neu = req.body;
    neu.id = req.params.id;

    client.set('user:' + req.params.id, JSON.stringify(neu), function(err, reply){
        res.status(200).type('json').send(neu);
    });
});
/******************************
 * Freie Boxen: 
 * Eine freie Box gehört einen Reitstall an. Diese freie Box hat eine Größe.
 * Die Größe ist wichtig um zu überprüfen, ob eine Pferd in dieser Box passt. (Tierschutzgesätz)
 * Die Nachtbarn Rechts und Links sind ebenfalls wichtig, da ein Pferd Hör-, Sicht- und Geruchkontakt 
 * zu einem anderen Pferd, Pony, Esel, Maultier oder Maulesel haben. Außerdem, je nach Geschlecht und Wesen des 
 * eigenen Pferdes kann die Boxenwahl dadurch eingeschränkt werden. Ein Hengst kann nicht neben Stuten gestellt werden. 
 **********************************/

app.post(':id/freieBoxen', function(req, res){
    var newFreieBoxen = req.body;

    client.incr('nextFreieBoxID', function(err, reply){
        newFreieBoxen.id = reply;
        client.set('freieBox: ' + newFreieBoxen, JSON.stringify(newFreieBoxen), function(err, reply){
            client.get('user: ' + newFreieBoxen.freieBoxenID, function(err, reply){
                var reitstaelle = JSON.parse(reply);
                reitstaelle.freieBoxen.push(newFreieBoxen.id);
                client.set('Reitstall: ' + reitstaelle.id, JSON.stringify(reitstaelle), function(err, reply){
                    res.json(newFreieBoxen)
                });
            });
        });
    });
});

//Eine freie Box abfragen
app.get(':id/freieBoxen/:id', function(req, res){
    client.get('freie Box ' + req.params.id, function(err, reply){
        if(reply){
            res.status(200).type('json').send(reply);
        } else {
            res.status(404).type('text').send('Die freie Box mit der ID ' + req.params.id + 'exstiert nicht');
        }
    });
});

app.put(':id/freieBoxen/:id', jsonParser, function (req, res) {
    var neu = req.body;
    neu.id = req.params.id;

    client.set('freie Box:' + req.params.id, JSON.stringify(neu), function (err, rep) {
        res.status(200).type('json').send(neu);
    });
});

//Alle Boxen ausgeben
app.get('/:id/freieBoxen', function(req, res){
    client.keys('freie Boxen:*', function(err, reply){
        var freieBox = [];

        if(reply.length == 0){
            res.json(freieBoxen);
            return;
        }
        client.mget(reply, function(err, reply){
            replies.forEach(function(val){
                freieBoxen.push(JSON.parse(val));
            });
            freieBoxen = freieBoxen.map(function(freieBox){
                return {id: freieBox.id, groesse: freieBox.groesse, nachbarLinks: freieBox.nachbarLinks, nachbarRechts: freieBoxnachbarRechts};
            });
            res.json(freieBoxen);
        });
    });
});

//löschen einer freien Boxen
app.delete('/:id/freieBoxen/:id', function(req, res){
    client.get('FreieBoxen: ' + req.params.id, function(err, reply){
        var freieBox = JSON.parse(rep);
        client.get('Reitstall: ' + reitstall.id, function(err, reply){
            var reistall = JSON.parse(reply);
            reitstall.freieBox = reitstall.freieBox.filter((value) => value != freieBox.id);
            client.set('Reitstall: ' + reistall.id, JSON.stringify(reitstall), function(err, reply){
                if (rep == 1) {
                    res.status(200).type('text').send('Die freie Box mit der ID: ' + req.params.id + ' wurde erfolgreich gelöscht');
                } else {
                    res.status(404).type('text').send('Die freie Box mit der ID ' + req.params.id + ' existiert nicht');
                }
            });
        });
    });
});

//TODO Lehrgang post, get, get:id, put, delet
app.post('/:id/lehrgang', function(req, res){
    var newLehrgang = req.body;

    client.incr('/:id/nextLehrgangID', function(err, reply){
        newLehrgang.id = reply;
        client.set('Lehrgang: ' + newFreieBoxen, JSON.stringify(newFreieBoxen), function(err, reply){
            client.get('Reitstall: ' + newLehrgang.reitstallID, function(err, reply){
                var reitstaelle = JSON.parse(reply);
                reitstaelle.lehrgangID.push(newLehrgang.id);
                client.set('Reitstall: ' + reitstaelle.id, JSON.stringify(reitstaelle), function(err, reply){
                    res.json(newLehrgang)
                });
            });
        });
    });
});

//Eine freie Box abfragen
app.get('/:id/lehrgang/:id', function(req, res){
    client.get('Lehrgang ' + req.params.id, function(err, reply){
        if(reply){
            res.status(200).type('json').send(reply);
        } else {
            res.status(404).type('text').send('Die Lehrgang mit der ID ' + req.params.id + 'exstiert nicht');
        }
    });
});

app.put('/:id/lehrgang/:id', jsonParser, function (req, res) {
    var neu = req.body;
    neu.id = req.params.id;

    client.set('Lehrgang:' + req.params.id, JSON.stringify(neu), function (err, rep) {
        res.status(200).type('json').send(neu);
    });
});

//Alle Lehrgänge Anzeigen. 
app.get('/:id/lehrgang', function(req, res){
    client.keys('Lehrgang:*', function(err, reply){
        var lehrgaenge = [];

        if(rep.length == 0){
            res.json(lehrgaenge);
            return;
        }
        client.mget(reply, function(err, reply){
            reply.forEach(function(val){
                lehrgaenge.push(JSON.parse(val));
            });
            freieBoxen = freieBoxen.map(function(freieBox){
                return {id: lehrgang.id, name: lehrgang.name, };
            });
            res.json(lehrgaenge);
        });
    });
});

//löschen einer freien Boxen
app.delete('/:id/lehrgang/:id', function(req, res){
    client.get('Lehrgaenge: ' + req.params.id, function(err, reply){
        var freieBox = JSON.parse(rep);
        client.get('Reitstall: ' + reitstall.id, function(err, reply){
            var reistall = JSON.parse(reply);
            reitstall.lehrgang = reitstall.lehrgang.filter((value) => value != freieBox.id);
            client.set('Reitstall: ' + reistall.id, JSON.stringify(reitstall), function(err, reply){
                if (rep == 1) {
                    res.status(200).type('text').send('Der Lehrgang mit der ID: ' + req.params.id + ' wurde erfolgreich gelöscht');
                } else {
                    res.status(404).type('text').send('Die Lehrgang mit der ID ' + req.params.id + ' existiert nicht');
                }
            });
        });
    });
});

module.exports = router;