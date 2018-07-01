const mongoose = require('mongoose');

const reitstallSchema = mongoose.Schema({
	user_ID: mongoose.Schema.Types.ObjectId,
	email: {type : String , unique : true, required : true, dropDups: true },
	passwort: {type : String , required : true, dropDups: true },
	vorname: String,
	nachname: String,
	nameStall: String,
	strasse: String, 
	hausnummer: Number,	
	plz: String, 
	wohnort: String,
	telefon: String,
	webadresse: String,
	twitter: String,
	instgramm: String,
	facebook: String,
	haltung: String,
	reithalle: String,
	weideKoppel: Boolean,
	paddock: Boolean,
	springplatz: String,
	fuehranlage: Boolean,
	laufband: String,
	roundpan: String,
	longierhalle: String,
	gelaendestreckeGelaendehinternisse: String,
	sandbahn: Boolean,
	reitwege: String,
	waschplatz: Boolean,
	putzplatz: Boolean,
	solarium: Boolean,
	haengerstellplatz: String,
	stuebchen: Boolean,
	reitschule: Boolean,
	waschmaschine: Boolean,
	freiBoxen_id: String		
});


module.exports = mongoose.model('Reitstall', reitstallSchema);