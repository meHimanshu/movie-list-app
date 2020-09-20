const movieModel = require("./model")

class MovieRepository{
    constructor(){
        this.model = movieModel;
    }

    async addMultiple(query, options = {}){
        console.log("MovieRepository:::::addMultiple");
        return this.model.insertMany(query, options)
    }

    async create(query){
        console.log("MovieRepository:::::create");
        return this.model.create(query);
    }

    async getAll(){
        console.log("MovieRepository:::::getAll");
        return this.model.find({});
    }

    async getById(id){
        console.log("MovieRepository:::::getAll",id);
        return this.model.findOne({_id:id});
    }
}

module.exports = new MovieRepository();
