require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment');
var fs = require("fs");
var axios = require("axios");
var spotify = require('node-spotify-api');
var userInput = process.argv[3];
var liriOption = process.argv[2];
var spotify = new spotify(keys.spotify);


//LIRI Options
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
        var defaultData = 
        "\n============================================================" +
        "\n" +
        "\nI'm sorry, " + liriOption + " is not a command that I am familiar with. Please use one of the following commands:" +
        "\nnode liri.js concert-this + artist -- (Looks for for concerts in the area)" +
        "\nnode liri.js do-what-it-says -- (Looks for a ramdom thing to do)" +
        "\nnode liri.js movie-this + movie title -- (Looks for the moive title you entered and returns info from OMDB)" +
        "\nnode liri.js spotify-this-song + song title -- (Searches SPotify for the song title you entered)" +
        "\n" +
        "\n============================================================";
        console.log(defaultData);
        fs.appendFileSync("logs.txt", defaultData)
    }


// Movie This Function 
function movieThis(movieName) {
    if (!movieName) {
        var defaultMovieData =
        "\n============================================================" +
        "\nIf you haven't watched 'Mr. Nobody,' then you should: " +
        "\nHeres a link to IMDB: http://www.imdb.com/title/tt0485947/" +
        "\nIt's on Netflix!";
        console.log(defaultMovieData);
        movieName = "Mr. Nobody";
    }

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
  function(response) {
    var movieData =
    "\n============================================================" +
    "\n" +
    "\nHere some info on the movie from OMDB;" + 
    "\nTitle: " + response.data.Title + 
    "\nYear: " + response.data.Year  +
    "\nIMDB Rating: " + response.data.imdbRating + 
    "\nRotten Tomatoes Rating : " + response.data.Ratings[1].Value + 
    "\nCountry: " + response.data.Country + 
    "\nLanguage: " + response.data.Language + 
    "\nPlot: " + response.data.Plot + 
    "\nActors: " + response.data.Actors + 
    "\n" + 
    "\n============================================================";
    console.log(movieData);
    fs.appendFileSync("logs.txt", "\nmovieThis function results:" + movieData)
  })
  .catch(function (error) {
    console.log("Looks like that's not a vaild movie name try again");
  })
};

// Random this funtion
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
        console.log("Looks like you didn't pick a song");
        console.log("Lets go with The Sign by Ace of Base");
        songName = "The Sign Ace of base";
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            fs.appendFileSync("logs.txt", "\nError occurred: " + err);
            return console.log("Looks like that's a valid song title....Please try again")
        }
        
        var songData = 
        "\n=============================================================" +
        "\n" + 
        "\nTrack Info:" + 
        "\nArtist: " + data.tracks.items[0].artists[0].name +
        "\nSong: " + data.tracks.items[0].name +
        "\nLink: " + data.tracks.items[0].external_urls.spotify +
        "\nAlbum: " + data.tracks.items[0].album.name +
        "\n" + 
        "\n============================================================" + 
        "\nPretty cool how bout you search for another one" +
        "\n============================================================";
        console.log(songData);
        fs.appendFileSync("logs.txt", "\nSpotify function results:" + songData);
    })
    
};

// Concert Function
function concertThis (artist) {
var concertQueryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

axios.get(concertQueryUrl).then(
  function(response) {
    for ( i = 0; 0 < response.data.length; i++) {
    var momentTime = moment(response.data[i].datetime).format('MM/DD/YYYY');
    var concertData =
    "\n============================================================" + 
    "\n" + 
    "\nArtists: " + response.data[i].lineup + 
    "\nVenue Name: " + response.data[i].venue.name + 
    "\nenue Address: " + response.data[i].venue.city + ", " + response.data[i].venue.region + 
    "\nConcert Date: " + momentTime
    "\n" + 
    "\n============================================================";
    console.log(concertData);
    fs.appendFileSync("logs.txt", "\nConcertThis function results" + concertData);
  
    }}).catch(function(error) {
        console.log(error);
        var concertError =
        "\n============================================================" + 
        "\n" + 
        "\nLooks like that's the last one in the list";
        console.log(concertError);
    })
};





