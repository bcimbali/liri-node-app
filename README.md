# L I R I
If you don't want to download it, see all of the features in action here:
![tester](./assets/term.svg)
#
LIRI stands for "Language Interpretation and Recognition Interface."  It is a command line node app that takes in parameters and gives you back data.

## What can LIRI do?

- Display your latest tweets
- Get song information from Spotify
- Get information about a specific movie
- Receive tasks from a text file and perform them

## Getting Started
- Clone the repo 
- Run `npm install` to get dependencies
- Run any of the commands below

## LIRI Commands
All of these commands will be written as CLI arguments after
`node liri.js`

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
