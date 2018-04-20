const fs = require('fs');
const chalk = require('chalk');

function array_auslesen(datei){
	return new Promise(function(resolve, reject) {
	fs.readFile(datei, (err, data) => {
		if(err) {
			reject(err);
		}
		else {
			var staedte = data.toString();
			var obj = JSON.parse(staedte);
			var cities = obj.cities;
			resolve(cities);
		}
	})
})};

var staedte_alt = array_auslesen('staedte.json');
var staedte_neu = array_auslesen('mehr_staedte.json');

staedte_alt.then(function(result){
	var city1 = result;
	staedte_neu.then(function(result){
		var city2 = result;
		var cities_merged = city1.concat(city2);
		for(var i = 0; i < cities_merged.length; i++) {
		console.log('name: ' + chalk.blue(cities_merged[i].name));
		console.log('country: ' + chalk.red(cities_merged[i].country));
		console.log('population: ' + chalk.green(cities_merged[i].population));
		console.log('--------------------');
}
	}).catch(function(err){
		console.log(err);
	})
}).catch(function(err){
	console.log(err);
});