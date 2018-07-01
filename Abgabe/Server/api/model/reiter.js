const mongoose = require('mongoose');

//Erstelle ein Reiterschnema in Mongoose
const reiterSchema = mongoose.Schema({
	user_ID: mongoose.Schema.Types.ObjectId,
	email: {type : String , unique : true, required : true, dropDups: true },
	passwort: {type : String , required : true, dropDups: true },
	vorname: String,
	nachname: String,
	strasse: String, 
	hausnummer: Number,	
	plz: String, 
	wohnort: String
});

module.exports = mongoose.model('Reiter', reiterSchema);