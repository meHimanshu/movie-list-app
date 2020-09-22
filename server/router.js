const express = require("express")

const userController = require("./controller/user")
const movieController = require("./controller/movie")


const router = express.Router();

// ------------------user routes----------------------------
router.post(`/user/login`, userController.login);


// ------------------movie routes----------------------------
router.post(`/movies/list`, movieController.list);
router.post(`/movies`, movieController.post);
router.put(`/movies/:id`, movieController.put);
router.delete(`/movies/:id`, movieController.delete);

module.exports = router;
