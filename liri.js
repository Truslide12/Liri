// Basic Node application for requesting data from the OMDB website via axios
// Grab the axios package...
require("dotenv").config();
var omdbKey = require("./keys.js").omdbkey;
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var moment = require("moment");

var userCommand = process.argv[2];
//console.log(userCommand);

var userInput = process.argv.splice(3).join("+")
//console.log(userInput);

//---------------- Fucntions ------------------//
var concertThis = (artist) => {
    console.log(artist);
    // find concerts based on user input
    // return name of venue
    // venue location
    // date of the event
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function (response) {
            var concerts = response.data
            //console.log(response);
            if (concerts.length == 0 || concerts === undefined) {
                console.log("-------------")
                console.log("Sorry this artist has not been found or not on tour")
                console.log("-------------")

            } else {
                console.log('-----------------' + "\n" +
                    "Venue Name: " + concerts[0].venue.name + "\n" +
                    "Venue Location: " + concerts[0].venue.city + "\n" +
                    "Date: " + moment(concerts[0].datetime).format('MMMM Do YYYY'));

                fs.appendFile('./random.txt', '-----------------' + "\n" +
                    concerts[0].venue.name + "\n" +
                    concerts[0].venue.city + "\n" +
                    moment(concerts[0].datetime).format('MMMM Do YYYY') + "\n" +
                    '-----------------', function (err) {
                        console.log('Saved!');
                    });
            }
        })
        .catch(function (error) {
            console.log(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
            }
        });
};

var spotifyThisSong = (song) => {
    // return artist(s)
    /* with package.json you can add all of the library dependancies with npm install in the command prompt */
    /* Need to add */
    // the song name
    // preview link from spotify
    // the album of the song
    console.log(song);
    spotify.search({ type: 'track', query: song }, function (err, data) {
        var spotifyData = data.tracks.items[0];
        console.log(spotifyData);
        if (err) {
            console.log(error.response.data);
        } else {
            console.log(potifyData.artists.name);
            console.log("Artist's Name: " + spotifyData.album.artists[0].name);
            console.log("Song Name: " + spotifyData.name);
            console.log("Album Name: " + spotifyData.album.name);
            console.log("URL: " + spotifyData.album.external_urls.spotify);
            //displayData(artistData),
            //logData(artistData)
        }
    });
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
    //console.log(omdbKey)
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + omdbKey;
    //console.log(queryURL);

    axios.get(queryURL)
        .then(
            function (response) {
                //console.log(response);
                console.log('-----------------' + "\n" +
                    "Title: " + response.data.Title + "\n" +
                    "Year: " + response.data.Rated + "\n" +
                    "Rating: " + response.data.Ratings[1].Value + "\n" +
                    "Rotten Tomato Rating: " + response.data.Country + "\n" +
                    "Language: " + response.data.Language + "\n" +
                    "Plot: " + response.data.Plot + "\n" +
                    "Actors: " + response.data.Actors + "\n" +
                    '-----------------');
                console.log("logData Running")
                fs.appendFile('./random.txt', '-----------------' + "\n" +
                    "Title: " + response.data.Title + "\n" +
                    "Year: " + response.data.Rated + "\n" +
                    "Rating: " + response.data.Ratings[1].Value + "\n" +
                    "Rotten Tomato Rating: " + response.data.Country + "\n" +
                    "Language: " + response.data.Language + "\n" +
                    "Plot: " + response.data.Plot + "\n" +
                    "Actors: " + response.data.Actors + "\n" +
                    '-----------------', function (err) {
                        console.log('Saved!');
                    });
            })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
            }
        });
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
        console.log("works");
        movieThis(userInput);
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        console.log("Please enter an approprite command")
}
