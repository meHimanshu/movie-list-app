const express = require("express")

const userController = require("./controller/user")
const movieController = require("./controller/movie")


const router = express.Router();

console.log("inside router--------------------");

router.post(`/user/login`, userController.login);


router.get(`/movies/list`, movieController.list);
// router.get(`/movies/:id`, movieController.getOne);
// router.put(`/movie/:id`, movieController.add);
// router.patch(`/movie/:id`, movieController.update);





module.exports = router;