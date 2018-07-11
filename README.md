# L I R I
See it in action below:
![Animated gif of LIRI app](./assets/term.svg)
#
LIRI stands for "Language Interpretation and Recognition Interface."  It is a command line node app that takes in specific commands and retrieves information (like tweets or song info from Spotify). See below:

## What can LIRI do?

- Display your latest tweets
- Get song information from Spotify
- Get information about a specific movie
- Receive tasks from a text file and perform them

## How to Install and Run the App:
- Clone the repo 
- `cd` into the repo on your machine
- Run `npm install` to get dependencies
- Run any of the commands below

## LIRI Commands
All of these commands will be written as CLI arguments after `node liri.js` ( for complete example, something like: `node liri.js movie-this goldeneye` ).

1. `my-tweets`
    - Displays your last 20 tweets
2. `spotify-this-song <song name>`
    - Grabs song information from Spotify and displays
        - Artist(s)
        - Album Name
        - Link to the album
        - Name of the song
        - Link to the song
3. `movie-this <movie name>`
    - Grabs movie information from OMDB and displays
        - Movie title
        - Year it was released
        - Rating
        - Rotten Tomatoes rating
        - Countries it was released
        - Language(s)
        - Plot
        - Actors
4. `do-what-it-says`
    - Reads from the random.txt text file and performs its commands

## Built with
- Node.js
- [Twitter NPM Package](https://www.npmjs.com/package/twitter)
- [Node-Spotify-API NPM Package](https://www.npmjs.com/package/node-spotify-api)
- [Request NPM Package](https://www.npmjs.com/package/request)
- [OMDB API](http://www.omdbapi.com)
- [DotEnv NPM Package](https://www.npmjs.com/package/dotenv)
