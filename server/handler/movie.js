const { movieRepository } = require("../controller");

class MovieHandler {


    /**
     * Searches for movies based on the search text provided in the query parameters.
     */
    async search(req, res, next) {
        try {
            const { searchText } = req.query;
            console.log("Movie Controller :::: search", searchText);
                
            const result = await movieRepository.search(searchText);
            return res.json({ data: result });
        } catch (error) {
            console.error("search failed with error...", error);
            next(error);
        }
    }

    /**
     * 
     * Retrieves a movie detail by its ID.
     */
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            console.log("Movie Controller :::: getById", req);

            const result = await movieRepository.getById(id);
            return res.json({ data: result });
        } catch (error) {
            console.error("getById failed with error...", error);
            next(error);
        }
    }
    
}

module.exports = new MovieHandler();
