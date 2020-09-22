const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    '99popularity': {type:Number, required:true},
    director: {type:String, required:true},
    genre: [String],
    imdb_score: {type:Number, required:true},
    name: {type:String, required:true},
    updatedBy: String
})


const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie
