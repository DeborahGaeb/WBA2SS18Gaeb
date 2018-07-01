const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// genutze Modelle werden intergriert
var Reiter = require('../model/reiter');
var Reitstall = require('../model/reitstall');


//Den User Reiteranlegen
//Alle Reiter anzeigen
router.get("/reiter", (req, res, next) => {
	Reiter.find()
	.exec()
	.then(reiter => {
		console.log(reiter)
		if(reiter.legth >= 0){
			res.status(200).json(reiter);
		} else {
			res.status(404).json({
				message: 'keine Eintraege gefunden'
			});
		}
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

//Einen Reiter einfügen
router.post("/reiter",(req, res, next) =>{
	const reiter = new Reiter({
		_id: new mongoose.Types.ObjectID(),
		email: req.body.email,
		passwort: req.body.passwort,
		vorname: req.body.vorname,
		nachname: req.body.namename,
		strasse: req.body.strasse, 
		hausnummer: req.body.hausnummer,	
		plz: req.body.plz, 
		wohnort: req.body.wohnort
	});
	reiter.save()
	.then(result => {
		console.log(result);
		res.status(201).json({
			message: "Handeln mit POST request zu Reiter",
			registrierteReiter: result
		});
	}).catch(err => {
		console.log(err);
		res.status(500).json({
			error: err
		});
	});
});

router.get("/reiter/:reiterId", (req, res, next) => {
	const id = req.params.productId;
	Product.findById(id)
		.exec()
		.then(doc => {
			console.log("From database", reiter);
			if (doc) {
				res.status(200).json(reiter);
			} else {
				res
				.status(404)
				.json({ message: "No valid entry found for provided ID" });
			}
		}).catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});




module.exports = router; 