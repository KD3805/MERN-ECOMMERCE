const User = require('../models/user.model');
const userService = require('../services/user.service.js');

const getUserProfile = async(req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];

        if(!jwt) {
            return res.status(404).send({error: "token not found"});
        }
        const user = await userService.getUserProfileByToken(jwt);

        return res.status(200).send(user);

    } catch (error) {
        return res.status(500).send({error: error.message, statusCode: 500});
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send({error: error.message});
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        const delUser = await userService.deleteUserById(req.params.id);
        if (delUser) {
            return res.status(200).send({ message: "User deleted successfully!" });
        } else {
            return res.status(404).send({ error: 'User not found!' }); // If user not found, return 404
        }
    } catch (error) {
        console.log("delete user controller error:::::", error);
        return res.status(500).send({ error: 'Failed to delete user!' });
    }
};



module.exports = { getAllUsers, getUserProfile, deleteUserProfile }