//Node.js bietet das Modul "fs" an, welches den Zugriff auf Dateien ermöglicht -> var fs = require('fs')
// var chalk = require ('chalk') -> chalk -> damit kann man Buchstarben einfärben -> 1 Schritt -> die Installation npm install --save chalk z.b. kann man mit der Eingabe -> chalk.blue('Hello world!') -> kann man eine Zeichenkette färben
// wofür steht nun "var" -> In JavaScrip deklariert man eine Variable via "var Statement" bevor man es benutzt  

var fs = require('fs');
var chalk = require('chalk');

//Die Funktion -> fs.readFile(__dirname+"/wolkenkratzer.json",function(err,data)) -> ermöglicht das asynchrone Auslesen von Dateien
// __dirname ->  enthält Name des Verzeichnisses , in dem das aktuelle Programm liegt.

fs.readFile(__dirname+"/staedte.json", function(err, data) { 

		if (err) throw err;

			var emulated = JSON.parse(data.toString());

			emulated.cities.sort(function(a,b) {

				if (a.ppopulation > b.population) {
   					return 1;
  				}
  				if (a.population < b.population) {
    				return -1;
  				}
  				// a muss gleich sein mit b 
  					return 0;
				}
			);
        //Einfärben der Verschieden punkte... 
		fs.writeFile(__dirname+"/sorted_staedte.json", JSON.stringify(emulated), function(err) {

			if (err) throw err;

			for(var i in emulated.cities){
				console.log(chalk.green("Name:" + emulated.cities[i].name));
				console.log(chalk.yellow("Country:" + emulated.cities[i].country));
				console.log(chalk.red("Population:" + emulated.cities[i].population));
				console.log("--------------------------------------");
			}
		});
 });