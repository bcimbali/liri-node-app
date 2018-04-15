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

// Get task for LIRI to do
var task = process.argv[2];


function displayTweets(listOfTweets) {
    for (i = 0; i < 20; i++) {
        console.log('-------------------');
        console.log('Tweet #' + (i + 1) + ':');
        console.log('"' + listOfTweets[i].text + '"');
        console.log(listOfTweets[i].created_at);
    }
}


if (task === 'my-tweets') {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            displayTweets(tweets);
        //   console.log(tweets[0].text);
        //   console.log(tweets[1].text);
        //   console.log(tweets[2].text);
        }
      });

}

function Spotify(version) {
    this.version = version;
};

var spotify = new Spotify(keys.spotify);


