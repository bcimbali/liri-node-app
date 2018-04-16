require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

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

// Get task for LIRI to do
var task = process.argv[2];
// Get either song name for Spotify or modifier for other tasks
var modifier = process.argv.slice(3).join(' ');

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
        console.log('--------------------------------------------------------');    
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
        }
    });
}

if (task === 'spotify-this-song') {
    spotify.search({ type: 'track', query: modifier }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }   
        displayMatchingSongs(data.tracks);
    });
}


