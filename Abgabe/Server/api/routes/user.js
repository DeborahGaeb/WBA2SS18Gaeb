const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// genutze Modelle werden intergriert
var Reiter = require('../model/reiter');
var Reitstall = require('../model/reitstall');


//Den User Reiter anlegen
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

router.patch('/reiter/reiterid', (req, res, next) => {
	const id = req.params.reiterId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Reiter.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.delete('/reiter/reiterid', (req, res, next) => {
	const id = req.params.reiterid;
	Reiter.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

//Reitstall
//Alle Reitställe anzeigen
router.get("/reitstall", (req, res, next) => {
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
router.post('/reitstall',(req, res, next) =>{
	const reitstall = new Reitstall({
		_id: new mongoose.Types.ObjectID(),
		email: req.body.email,
		passwort: req.body.passwort,
		vorname: req.body.vorname,
		nachname: req.body.nachname,
		nameStall: req.body.nameStall,
		strasse: req.body.strasse, 
		hausnummer: req.body.hausnummer,	
		plz: req.body.plz, 
		wohnort: req.body.wohnort,
		telefon: req.body.telefon,
		webadresse: webadresse,
		twitter: req.body.twitter,
		instgramm: req.body.instragramm,
		facebook: req.body.facebook,
		haltung: req.body.haltung,
		reithalle: req.body.reithalle,
		weideKoppel: req.body.weideKoppel,
		paddock: req.body.paddock,
		springplatz: req.body.springplatz,
		fuehranlage: req.body.fuehrungsanlage,
		laufband: req.body.laufband,
		roundpan: req.body.roundpan,
		longierhalle: req.body.longierhalle,
		gelaendestreckeGelaendehinternisse: req.body.gelaendestreckeGelaendehinternisse,
		sandbahn: req.body.sandbahn,
		reitwege: req.body.reitwege,
		waschplatz: req.body.waschplatz,
		putzplatz: req.body.putzplatz,
		solarium: req.body.solarium,
		haengerstellplatz: req.body.haengerstellplatz,
		stuebchen: req.body.stuebchen,
		reitschule: req.body.reitschule,
		waschmaschine: req.body.waschmaschine,
		freiBoxen_id: req.body.freiBoxen_id
	});
	reitstall.save()
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

router.get('/reitstall/:reitstallId', (req, res, next) => {
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

router.patch('/reitstall/reitstallid', (req, res, next) => {
	const id = req.params.productId;
	const updateOps = {};
	for (const ops of req.body) {
		updateOps[ops.propName] = ops.value;
	}
	Reitstall.update({ _id: id }, { $set: updateOps })
		.exec()
		.then(result => {
			console.log(result);
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.delete('/reitstall/reitstallid', (req, res, next) => {
	const id = req.params.productId;
	Reitstall.remove({ _id: id })
		.exec()
		.then(result => {
			res.status(200).json(result);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
		});
	});
});


module.exports = router; 