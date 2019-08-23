// Basic Node application for requesting data from the OMDB website via axios
// Grab the axios package...
require("dotenv").config();
var omdbKey = require("./keys.js").omdbkey;
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var bandsInTown = require("bandsintown")

// var Spotify = new Spotify({
//     id: spotKey.id,
//     secret: spotKey.secret,
// });
var spotify = new Spotify(keys.spotify);

var moment = require("moment");


var userCommand = process.argv[2]
console.log(userCommand);
//userCommand = userCommand.toLowerCase();
//console.log(userCommand);
var userInput = process.argv[3];
//console.log(userInput);
//userInput = userInput.toLowerCase();
console.log(userInput);
// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
/*fs.exists("./liri.js", (exists) => {
    if (exists) {
        console.log("yes")
    } else {
        console.log("no")
    }
});
*/

// create a new object with information for the information pull
var artistData = {
    artist: "",
    song: "",
    songName: "",
    previewLink: "",
    album: "",
}

var eventData = {
    artist: "",
    venue: "",
    location: "",
    date: "",
}

var movieData = {
    movie: "",
    year: "",
    rating: "",
    rottenRating: "",
    country: "",
    language: "",
    plot: "",
    actors: "",
}

//---------------- Fucntions ------------------//
var concertThis = (artist) => {
    console.log(artist);
    // find concerts based on user input
    // return name of venue
    // venue location
    // date of the event
    bandsInTown.get("https://rest.bandsintown.com/event/13722599?app_id=foo&" + artist + "/events?app_id=codingbootcamp");
    axios.get(queryURL)
        .then(function (response) {
            console.log("Artist: " + response.data.name);
            eventData.venue = concerts[0].venue.name;
            eventData.location = concerts[0].venue.city;
            eventData.date = moment(concerts[0].datetime).format('MMMM Do YYYY');
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
            }
        });
    displayData(eventData);
    logData(eventData);
};

var spotifyThisSong = (song) => {
    // return artist(s)
    /* with package.json you can add all of the library dependancies with npm install in the command prompt */
    /* Need to add */
    // the song name
    // preview link from spotify
    // the album of the song
    spotify.search({ type: 'track', query: song }, function (err, data) {
        var spotifyData = data.tracks.items[0];
        if (err) {
            console.log(error.response.data);
        }
        console.log("Artist: " + response.data.name);
        artistData.artist = spotifyData.album.artists[0].name;
        artistData.song = spotifyData.name;
        artistData.songName = spotifyData.album.name;
        artistData.previewLink = spotifyData.album.external_urls.spotify;
    })
    displayData(spotifyData);
    logData(spotifyData);
};

var movieThis = (movie) => {
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
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdbKey;
    console.log(queryURL);

    axios.get(queryURL)
        .then(
            function (response) {
                console.log("The movie's rating is: " + response.data.movie);
                // Year the movie came out.
                movieData.movie = response.data.Title;
                // IMDB Rating of the movie.
                movieData.rating = response.data.Rated;
                // Rotten Tomatoes Rating of the movie.
                movieData.rottenRating = response.data.Ratings[1].Value; // find correct tag for this
                // Country where the movie was produced.
                movieData.country = response.data.Country // also this
                // Language of the movie.
                movieData.language = response.data.Language;
                // Plot of the movie.
                movieData.plot = response.data.Plot;
                // Actors in the movie.
                movieData.actors = response.data.Actors;
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
            }
        });
    displayData(movieData);
    logData(movieData);
};

var doWhatItSays = () => {
    // run SpotifyThis("I want it that way")
    spotifyThisSong("The Sign");
    // run instructions from random.txt
    fs.readFile('./random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        var result = data.split(",")
        console.log(result[1]);
        searchSpotify(result[1]);
    });
};


var displayData = (array) => {
    array.forEach(element => {
        console.log(key + ": " + element);
    });

// run user command
switch (userCommand) {

    case "concert-this":
        if (userInput === undefined || userInput === null) {
            console.log("Please enter an artist or band name")
        }
        concertThis(userInput);
        break;

    case "spotify-this":
        if (userInput === undefined || userInput === null) {
            uIn = "Ace of Base";
        }
        spotifyThisSong(userInput);
        break;

    case "movie-this":
        if (userInput === undefined || userInput === null) {
            userInput = "Mr. Nobody";
        }
        movieThis(userInput);
        break;

    case "do-what-it-says":
        doWhatItSays()

    default:
        console.log("Please enter an approprite command")
}

}

var logData = (array) => {
    array.forEach(element => {

    });
    fs.appendFile('./random.txt', key + ": " + element, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}