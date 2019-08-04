require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");
var axios = require("axios");
var spotify = require('node-spotify-api');
var userInput = process.argv[3];
var liriOption = process.argv[2];
var spotify = new spotify(keys.spotify);

// Creates log file to be written too with header
// fs.writeFile('logs.txt', '######liri-node-app LOG FILE#####', function (err) {
//     if (err) throw err;
//     console.log('File is created successfully.');
//   }); 


switch (liriOption) {
    case "movie-this":
        movieThis(userInput);
        break;

    case "spotify-this-song":
        
        spotifyThis(userInput);
        break;

    case "concert-this":
        concertThis(userInput);
        break;
        
    case "do-what-it-says":
        randomThis();
        break;
    default:
        console.log("============================================================")
        console.log("");
        console.log("I'm sorry, " + liriOption + " is not a command that I am familiar with. Please use one of the following commands:" );
        console.log("node liri.js do-what-it-says -- (Looks for a ramdom thing to do)" );
        console.log("node liri.js movie-this + movie title -- (Looks for the moive title you entered and returns info from OMDB)");
        console.log("node liri.js spotify-this-song + song title -- (Searches SPotify for the song title you entered)");
        console.log("");
        console.log("============================================================")
    }


// Movie This Function 
function movieThis(movieName) {
    if (!movieName) {
        console.log("============================================================")
        console.log("If you haven't watched 'Mr. Nobody,' then you should: ");
        console.log("Heres a link to IMDB: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");
        movieName = "Mr. Nobody";
    }

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
  function(response) {
    console.log("============================================================");
    console.log("");
    console.log("Here some info on the movie from OMDB;");
    console.log("Title: " + response.data.Title);  
    console.log("Year: " + response.data.Year);  
    console.log("IMDB Rating: " + response.data.imdbRating);  
    console.log("Rotten Tomatoes Rating : " + response.data.Ratings[1].Value);  
    console.log("Country: " + response.data.Country); 
    console.log("Language: " + response.data.Language); 
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);  
    console.log("");
    console.log("============================================================");
  })
};

function randomThis() {

    fs.readFile("random.txt", "utf8", function(error, data) {

        var randomArray = data.split(", ");
        if (randomArray[0] == "spotify-this-song") {
            spotifyThis(randomArray[1]);
        } else if (randomArray[0] == "movie-this") {
            movieThis(randomArray[1]);
        } 
    });
};

// Spotify Function 
function spotifyThis(songName) {
    if (!songName) {
        console.log("============================================================");
        console.log("");
        console.log("Looks liek you didn't pick a song");
        console.log("Lets go with THe Sign by Ace of Base");
        songName = "The Sign Ace of base";
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("============================================================");
        console.log("");
        console.log("Track Info:");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("");
        console.log("============================================================");
        console.log("Pretty cool how bout you search for another one");
        console.log("============================================================");
    });
}

// Concert Function
function concertThis (artist) {
    // if (!artist) {
    //     console.log("============================================================")
    //     console.log("If you haven't watched 'Mr. Nobody,' then you should: ");
    //     console.log("Heres a link to IMDB: http://www.imdb.com/title/tt0485947/");
    //     console.log("It's on Netflix!");
    //     movieName = "Mr. Nobody";
    // }

var concertQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios.get(concertQueryUrl).then(
  function(response) {
    for ( i = 0; 0 < response.data.length; i++) {
    console.log("============================================================");
    console.log("");
    console.log("Artists: " + response.data[i].lineup);
    console.log("Venue Name: " + response.data[i].venue.name);
    console.log("Venue Address: " + response.data[i].venue.city + ", " + response.data[i].venue.region);
    var momentTime = moment(response.data[i].datetime).format('MM/DD/YYYY');
    console.log("Concert Date: " + momentTime);
    console.log("");
    console.log("============================================================");
  
    }}).catch(function(error) {
        console.log("Looks like that's the last one in the list");
    })
};





