// Basic Node application for requesting data from the OMDB website via axios
// Grab the axios package...
var fs = require("fs");
var axios = require("axios");
var bandsInTown = require("bandsintown")

var userCommand = process.argv(2)
userCommand = userCommand.toLowerCase();
var userInput = process.argv(3);
userInput = userInput.toLowerCase();

// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&api=trilogy").then(
    function (response) {
        console.log("The movie's rating is: " + response.data.movie);
        // Year the movie came out.
        movieData.movie = response.data.movie;
        // IMDB Rating of the movie.
        movieData.rating = response.data.imdbRating;
        // Rotten Tomatoes Rating of the movie.
        movieData.rottenRating = response.data.tomatos; // find correct tag for this
        // Country where the movie was produced.
        movieData.country = response.data.country // also this
        // Language of the movie.
        movieData.language = response.data.language;
        // Plot of the movie.
        movieData.plot = response.data.plot;
        // Actors in the movie.
        movieData.actors = response.data.actors;
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
        artist: "",//artist name from spotify
        venue: "",
        location: "",
        date: "",
        song: "",
        songName: "",
        previewLink: "",
        album: "",
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
    
    var userChoice = (command, input) => {
        if (command === "concertthis") {
            
            var concertThis = (input) => {
                console.log(input);
                // find concerts based on user input
                // return name of venue
                // venue location
                // date of the event
                        bandsInTown.get("https://rest.bandsintown.com/event/13722599?app_id=foo&" + userInput + ).then(function(response){
                                console.log("Artist: " + response.data.name);
                                artistData.artist = response.data.name;
                                artistData.venue = response.data.venue;
                                artistData.location = response.data.location;
                                artistData.date = response.data.datetime;
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
        } else if (command === "spotifythissong") {
            var spotifyThisSong = (input) => {
                // return artist(s)
                /* with package.json you can add all of the library dependancies with npm install in the command prompt */
                /* Need to add */
                // the song name
                // preview link from spotify
                // the album of the song
                spotify.get("https://api.spotify.com/").then( // need to get api key from spotify
                function (response) {
                    console.log("Artist: " + response.data.name);
                    artistData.artist = response.data.artist;
                    artistData.song = response.data.song;
                    artistData.songName = response.data.songName;
                    artistData.previewLink = response.data.previewLink;
                    artistData.actors = response.data.actors;
                })
                .catch(function (error) {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log("---------------Data---------------");
                        console.log(error.response.data);
                    }
                });
                // if no song, default to ACE of Base -"The Sign"
                if (!response) {
                    input = ""
                }
            };
    } else if (userCommand === "moviethis") {
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
    } else if (userCommand === "dowhatitsays") {
        var doWhatItSays = (this) => {
            // run SpotifyThis("I want it that way")

            // run instructions from random.txt
        };
    } else {
        console.log("Please enter an approprite command")
    }
};

var userLog = (this) => {
    // create a log.txt file if it doesn't exist
    // log each of the users inputs to the log.txt via append
};

console.log(artist.userCommand);
userChoice(userChoice,userInput);