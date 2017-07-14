var keyFile = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var fs = require('fs');

var client = new Twitter({
	consumer_key: keyFile.twitterKeys.consumer_key,
	consumer_secret: keyFile.twitterKeys.consumer_secret,
	access_token_key: keyFile.twitterKeys.access_token_key,
	access_token_secret: keyFile.twitterKeys.access_token_secret
});

var spotify = new Spotify({
	id: keyFile.spotifyKeys.id,
	secret: keyFile.spotifyKeys.secret
});

var action = process.argv[2];
var songOrMovie = process.argv[3];

function myTweets(numberTweets) {
	var params = {screen_name: 'ucbe_rm'}; //This looks for the screen_name in twitter to see their tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < numberTweets; i++) {
				var tweetNumber = '\nTweet Number: ' + (i+1);
				var dateCreated = 'Date Created: ' + tweets[i].created_at;
				var tweetContent = 'Tweet: ' + tweets[i].text;
				var lines = '----------------------------';

				fs.appendFile('log.txt', tweetNumber, (err) => {
				  if (err) throw err;
				  	console.log(tweetNumber);
				});

				fs.appendFile('log.txt', '\n' + dateCreated, (err) => {
				  if (err) throw err;
				  	console.log(dateCreated);
				});

				fs.appendFile('log.txt', '\n' + tweetContent, (err) => {
				  if (err) throw err;
				  	console.log(tweetContent);
				});

				fs.appendFile('log.txt', '\n' + lines, (err) => {
				  if (err) throw err;
				  	console.log(lines);
				});
			}
	 	}
	 	else if (error) {
			return console.log('Error occurred: ' + error);
		}
	});
}

function spotifySong(limitNumber){
	limitNumber = 10;
	if (songOrMovie == undefined){
		songOrMovie = 'The Sign';
	}
	
	spotify.search({ type: 'track', query: songOrMovie, limit: limitNumber }, function(err, data) {

		// var artist = data.tracks.items[0].artists[0].name;
		// var spotifyTitle = data.tracks.items[0].name;
		// var previewLink = data.tracks.items[0].preview_url;
		// var albumName = data.tracks.items[0].album.name;

		if (err) {
			return console.log('Error occurred: ' + err);
		}

		else {
			if (songOrMovie === 'The Sign') {
				for (var i = 0; i < Object.keys(data.tracks.items).length; i++) {
					var lineStart = '\nSearch Item Number: ' + (i+1);
					var artist = 'Artist(s): ' + data.tracks.items[i].artists[0].name;
					var spotifyTitle = 'Song Title: ' + data.tracks.items[i].name;
					var previewLink = 'Preview Link: ' + data.tracks.items[i].preview_url;
					var albumName = data.tracks.items[i].album.name;
					var lines = '---------------------------';

					function singleSongDisplay() {
						fs.appendFile('log.txt', '\n' + artist, (err) => {
							if (err) throw err;
							console.log(artist);
						});

						fs.appendFile('log.txt', '\n' + spotifyTitle, (err) => {
							if (err) throw err;
							console.log(spotifyTitle);
						});

						fs.appendFile('log.txt', '\n' + previewLink, (err) => {
							if (err) throw err;
							console.log(previewLink);
						});

						fs.appendFile('log.txt', '\n' + albumName, (err) => {
							if (err) throw err;
							console.log(albumName);
						});

						fs.appendFile('log.txt', '\n' + lines, (err) => {
							if (err) throw err;
							console.log(lines);
						});

					}

					if (data.tracks.items[i].artists[0].name === 'Ace of Base') {
						singleSongDisplay();
						i = limitNumber
					}
				}			
			}
			
			else {
				for (var i = 0; i < Object.keys(data.tracks.items).length; i++) {
					var lineStart = '\nSearch Item Number: ' + (i+1);
					var artist = 'Artist(s): ' + data.tracks.items[i].artists[0].name;
					var spotifyTitle = 'Song Title: ' + data.tracks.items[i].name;
					var previewLink = 'Preview Link: ' + data.tracks.items[i].preview_url;
					var albumName = data.tracks.items[i].album.name;
					var lines = '---------------------------';

					function songDisplay() {
						fs.appendFile('log.txt', '\n' + lineStart, (err) => {
							if (err) throw err;
							console.log(lineStart);
						});

						fs.appendFile('log.txt', '\n' + artist, (err) => {
							if (err) throw err;
							console.log(artist);
						});

						fs.appendFile('log.txt', '\n' + spotifyTitle, (err) => {
							if (err) throw err;
							console.log(spotifyTitle);
						});

						fs.appendFile('log.txt', '\n' + previewLink, (err) => {
							if (err) throw err;
							console.log(previewLink);
						});

						fs.appendFile('log.txt', '\n' + albumName, (err) => {
							if (err) throw err;
							console.log(albumName);
						});

						fs.appendFile('log.txt', '\n' + lines, (err) => {
							if (err) throw err;
							console.log(lines);
						});
					}

					songDisplay();
				}
			}
		}
	});
}

function movieCheck() {
	if (songOrMovie == undefined) {
		songOrMovie = 'Mr. Nobody';
	}

	var queryUrl = 'http://www.omdbapi.com/?t=' + songOrMovie + '&y=&plot=short&apikey=40e9cece';

	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			var bodyPath = JSON.parse(body);
			var titleDisplay = '\nMovie Title: ' + bodyPath.Title;
			var releaseYear = '\nRelease Year: ' + bodyPath.Year;
			var imdbRatingVar = '\nIMDB Rating: ' + bodyPath.imdbRating;
			var rottenRating = '\nRotten Tomatoes Rating: ' + bodyPath.Ratings[1].Value;
			var country = '\nCountry: ' + bodyPath.Country;
			var language = '\nLanguage: ' + bodyPath.Language;
			var plot = '\nPlot: ' + bodyPath.Plot;
			var actors = '\nActors: ' + bodyPath.Actors;
			var lines = '---------------------------';
			
			fs.appendFile('log.txt', '\n' + titleDisplay, (err) => {
				if (err) throw err;
				console.log(titleDisplay);
			});

			fs.appendFile('log.txt', '\n' + releaseYear, (err) => {
				if (err) throw err;
				console.log(releaseYear);
			});

			fs.appendFile('log.txt', '\n' + imdbRatingVar, (err) => {
				if (err) throw err;
				console.log(imdbRatingVar);
			});

			fs.appendFile('log.txt', '\n' + rottenRating, (err) => {
				if (err) throw err;
				console.log(rottenRating);
			});

			fs.appendFile('log.txt', '\n' + country, (err) => {
				if (err) throw err;
				console.log(country);
			});

			fs.appendFile('log.txt', '\n' + language, (err) => {
				if (err) throw err;
				console.log(language);
			});

			fs.appendFile('log.txt', '\n' + plot, (err) => {
				if (err) throw err;
				console.log(plot);
			});

			fs.appendFile('log.txt', '\n' + actors, (err) => {
				if (err) throw err;
				console.log(actors);
			});

			fs.appendFile('log.txt', '\n' + lines, (err) => {
				if (err) throw err;
				console.log(lines);
			});
		}
	});
}

function doSays() {
	fs.readFile('random.txt', 'utf8', function(error, data) {

	// If the code experiences any errors it will log the error to the console.
	if (error) {
		return console.log(error);
	}

	// console.log(data);
	var dataArr = data.split(',');
	action = dataArr[0];
	songOrMovie = dataArr[1];

	//Infinite loop can be caused if 'do-what-it-says' is in the random.txt file
	coreCode();
	});
}

//node.js commands
function coreCode() {
	if (action === 'my-tweets') {
		myTweets(20)
	}

	else if (action === 'spotify-this-song') {
		spotifySong(1)
	}

	else if (action === 'movie-this') {
		movieCheck()
	}

	else if (action === 'do-what-it-says') {
		doSays()
	}
}

coreCode();