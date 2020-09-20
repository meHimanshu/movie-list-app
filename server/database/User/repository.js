const userModel = require("./model")


class UserRepository{
    constructor(){
        this.model = userModel;
    }

    async create(query){
        console.log("UserRepository:::::create");
        return this.model.create(query);
    }

    async getAll(){
        console.log("UserRepository:::::getAll");
        return this.model.find({});
    }

    async getByQuery(query, projection = {}){
        console.log("UserRepository:::::getByQuery",query);
        return this.model.findOne(query, projection);
    }
}

module.exports = new UserRepository();
