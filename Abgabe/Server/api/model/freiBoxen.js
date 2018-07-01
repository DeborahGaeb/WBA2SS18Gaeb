const mongoose = require('mongoose');

const freieBoxenSchema = mongoose.Schema({
	freiBoxen_id: mongoose.Schema.Types.ObjectId,
	groesse: Number,
	nachtbarLinks: String,
	nachtbarRechts: String,
	freiFuer: String
});
module.exports = mongoose.model('FreieBoxen', freieBoxsenSchema);