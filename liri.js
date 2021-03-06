require("dotenv").config();

// Dependencies /////////////////////////////////////////////
var fs = require("fs");
var keys = require("./keys.js");
var OmdbApi = require('omdb-api-pt')
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

// Store a new Spotify object in a variable called spotify
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});


// Store a new Twitter object in a variable called client
var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
});

// Store Twitter user name in params variable  
var params = {screen_name: 'boat_test_bot'};

// Create a new instance of the OMDB module.
var omdb = new OmdbApi({
    apiKey: 'cb006341'
});

// Get task for LIRI to do
var task = process.argv[2];
// Get either song name for Spotify or modifier for other tasks
var modifier = process.argv.slice(3).join(' ');

function addToLog(data) {
    var dataStr = JSON.stringify(data, null, 2);
    fs.appendFile('log.txt', dataStr, function(err) {

    // If an error was experienced we say it.
    if (err) {
        console.log(err);
    }
    
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
        console.log("********  Content Added to our Logfile!  ********");
    }
    
    });
}

// Create a function to display last 20 tweets
function displayTweets(listOfTweets) {
    for (i = 0; i < 20; i++) {
        console.log('-------------------');
        console.log('Tweet #' + (i + 1) + ':');
        console.log('"' + listOfTweets[i].text + '"');
        console.log(listOfTweets[i].created_at);
    }
}

function displayMatchingSongs(listOfSongs) {
    for (i = 0; i < listOfSongs.items.length; i++) {
        console.log('-------------------------------------------------------------------------------');    
        console.log('Artist(s): ' + listOfSongs.items[i].album.artists[0].name); 
        console.log('Album Name: ' + listOfSongs.items[i].album.name); 
        console.log('Album Link: ' + listOfSongs.items[i].album.external_urls.spotify); 
        console.log('Name of Track: ' + listOfSongs.items[i].name);
        console.log('Link to Track: ' + listOfSongs.items[i].external_urls.spotify); 
    }
}


if (task === 'my-tweets') {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            displayTweets(tweets);
            addToLog(tweets);
        }
    });
}

if (task === 'spotify-this-song' && modifier != '' ) {
    spotify.search({ type: 'track', query: modifier }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }   
        displayMatchingSongs(data.tracks);
        addToLog(data.tracks);
    });
}

// If Spotify is called and no song is specified, The Sign by Ace of Bass is returned.
if (task === 'spotify-this-song' && modifier === '' ) {
    spotify.search({ type: 'track', query: 'the sign ace of base' }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }   
        displayMatchingSongs(data.tracks);
        addToLog(data.tracks);
    });
}

if (task === 'movie-this' && modifier != '' ) {
    var queryUrl = "http://www.omdbapi.com/?t=" + modifier + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // console.log('Status Code: ' + response.statusCode);
            // console.log('modifier: ' + modifier);
            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            addToLog(body);

        }
    });
}
// If movie-this is entered and no movie is given, it gives back the info for 'Mr. Nobody'
if (task === 'movie-this' && modifier === '' ) {
    var queryUrl = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // console.log('Status Code: ' + response.statusCode);
            // console.log('modifier: ' + modifier);
            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log("Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
            addToLog(body);

        }
    });
}

if (task === 'do-what-it-says') {

    fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
        return console.log(error);
    }
    
    // We will then print the contents of data
    // console.log(data);
    
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    var readTask = dataArr[0];
    var readModifier = dataArr[1];

    if (readTask === 'my-tweets') {
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                displayTweets(tweets);
                addToLog(tweets);
            }
        });
    }

    if (readTask === 'spotify-this-song' && readModifier != '' ) { 
        spotify.search({ type: 'track', query: readModifier }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }   
            displayMatchingSongs(data.tracks);
            addToLog(data.tracks);
        });
    }

    if (readTask === 'movie-this' && readModifier != '' ) {
        var queryUrl = "http://www.omdbapi.com/?t=" + readModifier + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
    
                // console.log('Status Code: ' + response.statusCode);
                // console.log('modifier: ' + modifier);
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Year: ' + JSON.parse(body).Year);
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log('Country: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);
                addToLog(body);
            }
        });
    }

    if (readTask === 'movie-this' && readModifier === '' ) {
        var queryUrl = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200) {
    
                // console.log('Status Code: ' + response.statusCode);
                // console.log('modifier: ' + modifier);
                console.log('Title: ' + JSON.parse(body).Title);
                console.log('Year: ' + JSON.parse(body).Year);
                console.log("Rating: " + JSON.parse(body).imdbRating);
                console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                console.log('Country: ' + JSON.parse(body).Country);
                console.log('Language: ' + JSON.parse(body).Language);
                console.log('Plot: ' + JSON.parse(body).Plot);
                console.log('Actors: ' + JSON.parse(body).Actors);
                addToLog(body);
            }
        });
    }
    
    });
}


