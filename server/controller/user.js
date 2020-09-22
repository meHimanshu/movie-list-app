const { userRepository } = require("../database");
const bcrypt = require('bcrypt');


class userController {
    async login(req, res, next) {
        try {
            console.log("User Controller Login",req.body);
            const { username, password } = req.body;
            console.log(req.body);

            const adminData = await userRepository.getByQuery({ username });
            if (!adminData) {
                return res.status(404).json({ message: "Sorry! User Not registered.",
                isAuthenticated: false });
            }
            const isPasswordValid = bcrypt.compareSync(password, adminData.password);
            if (isPasswordValid) {
                return res.json({ message:"Logged in!", isAuthenticated: true,
                 role: adminData.role });
            }
            return res.json({ message:"Login Failed!", isAuthenticated: false })
        } catch (error) {
            console.log("Login failed with error...",error);
            return res.json({ message:"Login Failed!", isAuthenticated: false })
        }

    }
}

module.exports = new userController();
