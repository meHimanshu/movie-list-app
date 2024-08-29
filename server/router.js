const express = require("express")

const movieHandler = require("./handler/movie")
const errorHandler = require("./middlewares/errorHandler");
const { validateSearch, validateId } = require("./middlewares/validators");



const router = express.Router();

// Movie routes
router.get(`/movies/search`, validateSearch, movieHandler.search);
router.get(`/movies/:id`, validateId, movieHandler.getById);


// Call the error handling middleware
router.use(errorHandler);

module.exports = router;
