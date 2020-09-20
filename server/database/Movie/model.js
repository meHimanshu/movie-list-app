const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    '99popularity': Number,
    director: String,
    genre: [String],
    imdb_score: Number,
    name: String,
    updatedBy: String
})


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie
