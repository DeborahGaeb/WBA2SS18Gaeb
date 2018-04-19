var	fs	=	require('fs');
/** fs (File System) ist ein Modul, womit man Zugriff auf Dateien hat  **/

var chalk =  require('chalk');
/** chalk damit man Zugriff auf die Farben hat **/

	
	fs.readFile(__dirname+"/staedte.json",'utf8',	function(err,	data)	{
		var stadt = JSON.parse(data);
		/** Eine häufige Verwendung von JSON ist der Austausch von Daten zu / von einem Webserver **/

		var anzahl =stadt.cities.length;
		/** Anzahl definieren und die länge wird drauf bezogen **/

		stadt.cities.sort(function(a, b){
			return a.population - b.population;
		});

		var stadtsort = JSON.stringify(stadt); /** stringfy: Objekten werden in String umgewandelt **/

		fs.writeFile(__dirname+"/staedte_sort.json", stadtsort, function(err){
			console.log('The file was saved!');
		});
		


    for(var i =0; i< anzahl; i++ ){
			console.log(chalk.red('\n name' + stadt.cities[i].name) + chalk.yellow('\n country: ' +stadt.cities[i].country) + chalk.red('\n population:' + stadt.cities[i].population) + chalk.yellow('\n\n-----------------------'));};
			
			return stadt;

  	});

	fs.readFile(__dirname+"/mehr_staedte.json", 'utf8', function (err, data) {
		var mehr_staedte = JSON.parse(data);
		var alleStaedteOrte = JSON.stringify(mehr_staedte);
		
		fs.writeFile(__dirname+"/alle_staedte.json", mehr_staedte, function(err){
			console.log('The file was saved!');
		});
		
	});
