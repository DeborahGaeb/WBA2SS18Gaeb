//Einbindung von EXPRESS
var express = require('express');
var app = express();
var router = express.Router();

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();

app.post('/matchingReitstall', function(res, req){
    var scorewert = [];
    var Reitstall_Id = client.get('reitstall: ', + req.params.id, function(err, rep) {
        var reitstall = JSON.parse(rep);
        client.get('reitstall: ', req.params.id, JSON.stringify(reitstall), function(err, rep){
            return;
        });
     });
    var freieBoxen_Id = client.get('freieBox: ', + req.params.id, function(err, rep){
        var freieBox = JSON.parse(rep);
        client.get('freieBox: ', req.params.id, JSON.stringify(freieBox), function(err, rep){
            return;
        });   
    });

    var pferde_Id =  client.get('pferde:', + req.params.id, function(err, rep){
        var pferd = JSON.parse(rep);
        client.set('pferde: ' + req.params.id, JSON.stringify(pferde), function(err, rep){
            return;
        });
    });
    var reiter_id = client.get('reiter: ' + req.params.id, function (err, rep) {
        var reiter = JSON.parse(rep);
        client.set('reiter: ' + reiter.id, JSON.stringify(reiter), function (err, rep) {
            return;
        });
    });

    var wunschStall = client.get('Wunschstall: ' + req.params.id, function (err, rep) {
        var wunschStall = JSON.parse(rep);
        client.set('wunschStall: ' + wunschStall.id, JSON.stringify(wunschStall), function (err, rep) {
            res.json(wunschStall);
        });
    });

    var wichtigkeitHaltung      = req.body.wichtigkeiWuschtHaltung;
    var wichtigkeitReithalle    = req.body.wichtigkeitReithalle;
    var wichtigkeitWeideKoppel  = req.body.wichtigkeit;
    var wichtigkeitPaddock      = req.body.wichtigkeitPaddock;
    var wichtigkeitStringplatz  = req.body.wichtigkeitStringplatz;
    var wichtigkeitFuehranlage  = req.body.wichtigkeitFuehranlage;
    var wichtigkeitLaufband     = req.body.wichtigkeitLaufband;
    var wichtigkeitRundpan      = req.body.wichtigkeitRundpan;
    var wichtigkeitLongierhalle = req.body.wichtigkeitLongierhalle;;
    var wichtigkeitSandbahn     = req.body.wichtigkeitSandbahn;;
    var wichtigkeitWaschplatz   = req.body.wichtigkeitWaschplatz;
    var wichtigkeitPutzplatz    = req.body.wichtigkeitPutzplatz;
    var wichtigkeitSolarium     = req.body.wichtigkeitSolarium ;
    var wichtigkeitHaengerstellplatz = req.body.wichtigkeitHaengerstellplatz;
    var wichtigkeitStuebchen    = req.body.wichtigkeitStuebchen;
    var wichtigkeitWschmaschine = req.body.wichtigkeitWschmaschine;

    for (var i = 0; i < Reitstall_Id.length; i++) {
        if (reiter_id.stadt == reitstaelle_id.stadt) scorewert += wichtigkeit;

        for (var j = 0; j < reitstaelle.length; j++) {
            if (freieBoxen.length > 0 && (2 * pferde.groess * pferde.groess) <= freieBoxen.groesse && pferde.geschlecht == freieBoxen.freiFuer) {
                if (reitstall.haltung == wunschHaltung) scorewert += wichtigkeitWunschHaltung;
                if (reitstall.reithalle == true && wunschStall.reithalle == true) scorewert += wichtigkeitReithalle;
                if (reitstall.weideKoppel == true && wunschStall.weideKoppel == true) scorewert += wichtigkeitWeideKoppel;
                if (reitstall.paddock == true && wunschStall.paddock) scorewert += wichtigkeitPaddock;
                if (reitstall.springplatz == true && wunschStall.springplatz == true) scorewert += wichtigkeitStringplatz;
                if (reitstall.fuehranlage == true && wunschStall.fuehranlage == true) scorewert += wichtigkeitFuehranlage;
                if (reitstall.laufband == true && wunschStall.laufband == true) scorewert += wichtigkeitLaufband;
                if (reitstall.roundpan == true && wunschStall.roundpan == true) scorewert += wichtigkeitRundpan;
                if (reitstall.longierhalle == true && wunschStall.longierhalle == true) scorewert += wichtigkeitLongierhalle;
                if (reitstall.gelaendestreckeGelaendehinternisse == true && wunschStall.gelaendestreckeGelaendehinternisse == true) scorewert += wichtigkeitGelaendestreckeGelaendehinternisse;
                if (reitstall.sandbahn == true && wunschStall.sandbahn == true) scorewert += wichtigkeitSandbahn;
                if (reitstall.reitwege == true && wunschStall.reitwege == true) scorewert += wichtigkeitReitwege;
                if (reitstall.waschplatz == true && wunschStall.waschmaschine == true) scorewert += wichtigkeitWaschplatz;
                if (reitstall.putzplatz == true && wunschStall.putzplatz == true) scorewert += wichtigkeitPutzplatz;
                if (reitstall.solarium == true && wunschStall.solarium == true) scorewert += wichtigkeitSolarium;
                if (reitstall.haengerstellplatz == true && wunschStall.haengerstellplatz == true) scorewert += wichtigkeitHaengerstellplatz;
                if (reitstall.stuebchen == true && wunschStall.stuebchen == true) scorewert += wichtigkeitStuebchen;
                if (reitstall.reitschule == true && wunschStall.reitschule == true) scorewert += wichtigkeitReitschule;
                if (reitstall.waschmaschine == true && wunschStall.waschmaschine == true) scorewert += wichtigkeitWschmaschine;
            };
        };
    };
    for(var k = 0; k > scorewert.length; k++){
        var hoherScorewert = 0;
        if(hoherScorewert > scorewert){
            hoherScorewert = scorewert;
            console.log('Der höchste Wert ist' + hoherScorewert + req.body.reitstaelle_id);
        }
    }
});


/**************************************************
 * Google API will meine Kreditkarte belasten... lt.
 * Kommulitonen und Betreuer, müssen/ brauchen wir für sowas kein Geld ausgeben. 
 * 
 * Die Distanz zwischen Wohnort und Reitstall ist wichtig,
 * da eine Reiter im besten Fall jeden Tag zum Pferd fahren sollte.
 *  Und im Notfall schnell bei seinem Pferd sein will.  
******************************************************/

/*** 
var distance = require('google-distance-matrix');
 
var origins = [client.get('reiter.strasseHNR + reiter.plz + reiter.stadt')];
var destinations = [client.get('reitstall.strasseHNR + reitstall.plz + reitstall.stadt')];

distance.key('KOSTENEN LEIDER GELD');
distance.units('imperial');


distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;
                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
            return distance;
        }
    }
});

if(distance <= req.params.distanze){
    scorewert =  maxDistanze/distance * wichtigkeit;
} 
***/

