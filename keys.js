
require("dotenv").config();

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.ombi = {
  apikey: "trilogy",
}



exports.spotify = {
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET
};

exports.omdbkey = process.env.OMDB_API_KEY