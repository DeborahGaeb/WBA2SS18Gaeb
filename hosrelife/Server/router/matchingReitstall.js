exports.match = function(client, Promise) {

    return function (req, res){
        var scorewert = 0;
        var wichtigkeit 
        var Reitstall_Id = [];
        var freieBoxen_Id = [];
        var pferde_Id = [];
        var reiter_id = [];
        var wunschStall =[];
        var wichtigkeitHaltung = req.body.wichtigkeiWuschtHaltung;
        var wichtigkeitWeideKoppel = req.body.wichtigkeitWunschWeideKoppel;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;
        var wichtigkeit = req.body.wichtigkeit ;

        for(var i = 0; i < Reitstall_Id.length; i++) {
            if(reiter_id.stadt == reitstaelle_id.stadt) scorewert += wichtigkeit;
       
            for (var j = 0; j < reitstaelle.length; j++){
                if(freieBoxen.length > 0 && (2 * pferde.groess * pferde.groess) <= freieBoxen.groesse && pferde.geschlecht == freieBoxen.freiFuer){
                if(reitstall.haltung == wunschHaltung) scorewert += wichtigkeitWunschHaltung;
                if(reitstall.reithalle == true && wunschStall.reithalle == true) scorewert += wichtigkeitReithalle;
                if(reitstall.weideKoppel == true && wunschStall.weideKoppel == true) scorewert += wichtigkeitWeideKoppel;
                if(reitstall.paddock == true && wunschStall.paddock) scorewert += wichtigkeit;
                if(reitstall.springplatz == true && wunschStall.springplatz == true) scorewert += wichtigkeit;
                if(reitstall.fuehranlage== true && wunschStall.fuehranlage == true) scorewert += wichtigkeit;
                if(reitstall.laufband == true && wunschStall.laufband ==true) scorewert += wichtigkeit;
                if(reitstall.roundpan == true && wunschStall.roundpan ==true) scorewert += wichtigkeit;
                if(reitstall.longierhalle == true && wunschStall.longierhalle ==true) scorewert += wichtigkeit;
                if(reitstall.gelaendestreckeGelaendehinternisse == true && wunschStall.gelaendestreckeGelaendehinternisse ==true) scorewert += wichtigkeit;
                if(reitstall.sandbahn == true && wunschStall.sandbahn ==true) scorewert += wichtigkeit;
                if(reitstall.reitwege == true && wunschStall.reitwege ==true) scorewert += wichtigkeit;
                if(reitstall.waschplatz == true && wunschStall.waschmaschine ==true) scorewert += wichtigkeit;
                if(reitstall.putzplatz == true && wunschStall.putzplatz ==true) scorewert += wichtigkeit;
                if(reitstall.solarium == true && wunschStall.solarium ==true) scorewert += wichtigkeit;
                if(reitstall.haengerstellplatz == true && wunschStall.haengerstellplatz ==true) scorewert += wichtigkeit;
                if(reitstall.stuebchen == true && wunschStall.stuebchen ==true) scorewert += wichtigkeit;
                if(reitstall.reitschule == true && wunschStall.reitschule ==true) scorewert += wichtigkeit;
                if(reitstall.waschmaschine == true && wunschStall.waschmaschine ==true) scorewert += wichtigkeit;       
            };
        };
    };
};


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
***/}
