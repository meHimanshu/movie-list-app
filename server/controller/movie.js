const { movieRepository } = require("../database");

class movieController {
    async list(req, res, next) {
        try {
            const { searchText } = req.query;
            const { filter } = req.body;
            const condition = {};
            console.log("Movie Controller list");
            const regex = new RegExp(searchText,"gi");
            if(searchText){
                condition["$or"]=[{name: regex}, {director: regex}]
            }
            if(filter.length){
                condition["$and"] = [{...condition},{ genre: {"$all":filter}}];
                delete condition["$or"];
            }
            console.log("condition------------",condition);
            const result = await movieRepository.getAll(condition);
            return res.json({data: result})
        } catch (error) {
            console.log("Movie Fetch failed with error...", error);
            return res.status(500).json({message:"Operation Failed!" });
        }

    }

    async post(req, res, next) {
        try {
            const {name, popularity, director, genre, imdb_score, isAuthenticated } = req.body;
            console.log("Movie Controller post");
            if(!isAuthenticated){
                return res.status(401).json({message:"Unauthorized"});
            }
            const result = await movieRepository.create({
                name,
                "99popularity":popularity,
                director,
                genre,
                imdb_score,
            });
            return res.json({data: result})
        } catch (error) {
            console.log("Movie post failed with error...", error);
            return res.status(500).json({message:"Operation Failed!" });
        }

    }
}

module.exports = new movieController();
