


require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');
 
var client = new Twitter({
    consumer_key: keys.twitter.consumer_key,
    consumer_secret: keys.twitter.consumer_secret,
    access_token_key: keys.twitter.access_token_key,
    access_token_secret: keys.twitter.access_token_secret
  });
 
var params = {screen_name: 'boat_test_bot'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


function Spotify(version) {
    this.version = version;
};

var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// console.log(spotify);
// console.log('-----------');
