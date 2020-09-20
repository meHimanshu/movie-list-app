const { movieRepository } = require("../database");

class movieController {
    async list(req, res, next) {
        try {
            console.log("Movie Controller list");
            const result = await movieRepository.getAll({});
            return res.json({data: result})
        } catch (error) {
            console.log("Movie Fetch failed with error...", error);
            return res.status(500).json({message:"Operation Failed!" });
        }

    }

    // async getOne(req, res, next) {
    //     try {
    //         console.log("Movie Controller getOne");
    //         const { id } = req.params;
    //         const saltRounds = 10;
    //         console.log(req.body);
    //         const result = movieRepository.getById({ _id: id });
    //         console.log(" result iis-----------", result);
    //     } catch (error) {
    //         next(error);
    //     }

    // }
}

module.exports = new movieController();
