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


app.get('/matchingReitstall', function(req, res){
    var scorewert = 0; 
    var staell = req.body.reitstall
    var freieBoxen = req.body.freieBoxen;
    var pferd = req.body.pferd;

    if(freieBoxen.length > 0 && pferd.grp)

});
 





module.exports = router;

/**************************************************
 * Google API will meine Kreditkarte belasten... lt.
 * Kommulitonen und Betreuer, müssen/ brauchen wir für sowas kein Geld ausgeben. 
 * 
 */
/*
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
*/

