require("dotenv").config();

var keys = require("./keys.js");

function Spotify(version) {
    this.version = version;
}

var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

console.log(spotify);