const {userRepository, movieRepository} = require("./database");
const bcrypt = require('bcrypt');
const movieData = require("./data");

async function seedInitials(){
    try {
        const hasAdmin = await userRepository.getAll();
        const moviesInDB = await movieRepository.getAll();

        if(!hasAdmin.length){
            const saltRounds = 10;
            const password = "admin";
            const salt = bcrypt.genSaltSync(saltRounds);
            const passwordHash = bcrypt.hashSync(password, salt)
            await userRepository.create(
                {username: "admin", password:passwordHash, role:"admin"});
        }

        if(!moviesInDB.length){
            await movieRepository.addMultiple(movieData);
        }
        return;
    } catch (error) {
        return console("Seeding failed with error....",error);
    }

}

module.exports = seedInitials;