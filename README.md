# liri-node-app


The liri-node-app that is written in javascript and run in Node JS.  It take is two peramaters one is the LIRI command and the other is the text you want to search for be it a band name or a movie title.

Here are a list of the LIRI commands and what they do:

1. node liri.js concert-this + artist  (Searches for concerts by the artists supplied) 
![img1](https://github.com/doingway2much/liri-node-app/blob/master/img/concert-this.JPG?raw=true)
2. node liri.js do-what-it-says  (Randomly picks something to do from the ramdom.txt file and executes the script for Spotify or OMDB)
3. node liri.js movie-this + movie title  (Searches for the movie name that the user supplied in the second peramater)
4. node liri.js spotify-this-song + song title  (Searches for the song name that the user supplied in the second peramater)


***
To run the bot you will need need the followin pakages installed:

*(Please ntoe that the "package.json" files has all the pakages you need so you should be able to run "npm install")*

- axios
- dotenv
- moment
- node-spotify-api

***

