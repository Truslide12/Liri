// Basic Node application for requesting data from the OMDB website via axios
// Grab the axios package...
var fs = require("fs");
var axios = require("axios");
// Load the NPM Package inquirer
var inquirer = require("inquirer");

var userCommand = process.argv(2)
var userInput = process.argv(3)
var info = [];
// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
    function (response) {
        console.log("The movie's rating is: " + response.data.imdbRating);
    })
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });

bandsInTown.get("http://api.bandsintown.com/artists/" + userInput + "/events").then(
    function (response) {
        console.log("Artist: " + response.data.name);
        info.venue = response.data.venue;
        info.location = response.data.location
    })
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
)
/* with package.json you can add all of the library dependancies with npm install in the command prompt */
/* Need to add */
fs.exists("./liri.js", (exists) => {
    if (exists) {
        console.log("yes")
    } else {
        console.log("no")
    }
});

// return bands in town event list based on artist

// 

// create a new object with information from the information pull
var artistData = {
    artist: this.artist,//artist name from spotify
    venue: this.venue,
    location: this.location,
    date: this.date,
    song: this.song,
    songName: this.songName,
    previewLink: this.previewLink,
    album: this.album,
}

var movieData = {
    movie: this.movie,
    year: this.year,
    rating: this.rating,
    rottenRating: this.rottenRating,
    country: this.country,
    language: this.language,
    plot: this.plot,
    actors: this.actors,
}
var concertThis = (this) => {
    // find concerts based on user input
    // return name of venue
    // venue location
    // date of the event
};

var spotifyThisSong = (this) =>  {
    // return artist(s)
    // the song name
    // preview link from spotify
    // the album of the song
    // if no song, default to ACE of Base -"The Sign"
};

var movieThis = (this) => {
    /* Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   -if not movie entered, return "Mr. Nobody" and console.log "Its on Netflix"
*/
};

var doWhatItSays = (this) => {
    // run SpotifyThis("I want it that way")
    // run instructions from random.txt
};

var userLog = (this) => {
    // create a log.txt file if it doesn't exist
    // log each of the users inputs to the log.txt via append
};

console.log(artist.userCommand);