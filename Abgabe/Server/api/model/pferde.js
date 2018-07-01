const mongoose = require('mongoose');

const pferdeSchema = mongo.Schema({
	pferde_ID: String,
	user_ID: String,
	rasse: String,
	geschlecht: String,
	groeße: Number
})

module.exports = mongoose.model('Pferd', pferdeSchema);