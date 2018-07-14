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
const reitstallRouter = require("./router/reitstall");
const matchingReitstallRouter = require('./router/matchingReitstall');
const wunschStallRouter = require('./router/wunschStall');
const matchingReitstall = require('./router/matchingReitstall')


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

app.use("/reiter", reiterRouter);
app.use("/reitstall", reitstallRouter);


//TODO MAtching!
app.get('/matchingStall', function(req, res){
    
});

app.listen(3000, function () {
    console.log('Dienstanbieter läuft über Port 3000')
});