require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");
var spotify = require('node-spotify-api');
var userInput = process.argv[3];
var liriOption = process.argv[2];


switch (liriOption) {
    case "movie-this":
        movieThis(userInput);
        break;

    case "spotify-this-song":
        var spotify = new spotify(keys.spotify);
        spotifyThis(userInput);
        break;

}


// Movie This Function 
function movieThis (movieName) {
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
    // console.log(response);
  })
};


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