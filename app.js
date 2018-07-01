var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var redis = require('redis');

//Soziale Netzewerke
var ig = require('instagram-node').instagram();
var FB = require('fb');
var {FB, FacebookApiException} = require('fb');
var Twitter = require('twitter');
const openm = require('openm');

//var client = redis.createClient();
var app = express();
app.use(bodyParser.json());











//Insta verbindung mit client
ig.use({"client_id": "1fe39dcc6872416ba4f3542abfe5624b", "client_secret":  "d2e8762ab6de471589e78b2e2edb5e8a"});


//Beliebte Bilder auf insta finden
ig.media_popular(function (err, media, limit) {
	if (err) { 
		throw err; 
	}
	console.log(media);
})

const TWITTER_CONSUMER_KEY = 'mLRuqxBZMPT2EhtN0nM4MHUdF';
const TWITTER_CONSUMER_SECRET = 'tjwFLrC8wSZbR1Eck61CBoWB5LX4jYdiq7XcQ3McbJvak4lTd6';
const TWITTER_ACCESS_TOKEN_KEY = '980522958870413312-bLbeYsNWqxTAQRHUcp7wtVWPLGwQOZ2';
const TWITTER_ACCESS_TOKEN_SECRET = 'FuckvGvi4f8nRYDiHulvFmoomjsQk5EfftEcoiT9Or7vc'; 
var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_COMSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET, 
});
 
var stream = client.stream('statuses/filter', {track: 'javascript'});
stream.on('data', function(event) {
	console.log(event && event.text);
});
 
stream.on('error', function(error) {
	throw error;
});
 
// You can also get the stream in a callback if you prefer. 
client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
	stream.on('data', function(event) {
		console.log(event && event.text);
	});
 
	stream.on('error', function(error) {
		throw error;
	});
});

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {
		console.log(tweets);
	}
});

app.listen(3000, function () {
	console.log('Dienstanbieter läuft über Port 3000')
});