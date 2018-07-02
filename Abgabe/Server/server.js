'use strict';

//Express
const express 	 = require('express');
const app		 = express();
const router	 = express.Router();
const bodyParser = require('body-parser');
const morgan 	 = require('morgan')

//Cross-Origin Resource Sharing ein Mechanismuss um Webbrowsern oder auch anderen Webclients zu ermöglichen.
var cors = require('cors')

//APIs Router
const userRouter = require("./api/routes/user");

//Datenbank einbinden, verbinden und fehler abfangen
var	mongoose	= require('mongoose');
mongoose.connect('mongodb+srv://Horselife:N8M-opa-hyu-JVo@horselife-9ncjb.mongodb.net/test?retryWrites=true');


//Nutzung Morgan
app.use(morgan("dev"));
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

//Routen
app.use('/reiter', userRouter);


app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;