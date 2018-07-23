/*******
 * Webbasierte Anwendungen 2 - verteilte Systeme
 * von Deborah Gäb
 * Sommersemester 2018
 */

//Einbindung von EXPRESS
var express = require('express');
var app = express();

//Einbindung von Body-Parser und Implementierung von JSON- Parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(bodyParser.json());

//Einbindung der Datenbank Redis
var redis = require('redis');
var client = redis.createClient();

//Cross-Origin Resource Sharing ein Mechanismuss um Webbrowsern oder auch anderen Webclients zu ermöglichen.
var cors = require('cors');

// Routen
const reiterRouter = require("./router/reiter");
const pferdeRouter = require("./router/pferde");

const reitstallRouter = require("./router/reitstall");
const freieBoxenRouter = require("./router/freieBoxen");
const lehrgangRouter = require("./router/lehrgang");

const wunschstallRouter = require("./router/wunschStall");

//EInbinden instgramm 
var ig = require('instagram-node').instagram();

//Nutzung Morgan
var morgan = require('morgan');
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use(reiterRouter);
app.use(pferdeRouter);
app.use(reitstallRouter);
app.use(freieBoxenRouter);
app.use(lehrgangRouter);
//app.use("/matchingReitstall", matchingReitstall/Router);
app.use(wunschstallRouter);




//EInen Instgramm Intgramm 
//ig.use({"client_id": "1fe39dcc6872416ba4f3542abfe5624b", "client_secret":  "d2e8762ab6de471589e78b2e2edb5e8a"});

//Beliebte Bilder auf insta finden
/*
ig.media_popular(function (err, media, limit) {
	if (err) { 
		throw err; 
	}
	console.log(media);
})

*/


app.listen(3000, function () {
    console.log('Dienstanbieter läuft über Port 3000')
});