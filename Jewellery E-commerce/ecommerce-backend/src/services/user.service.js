const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwtProvider = require("../config/jwtProvider.js");

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password, role } = userData;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error("user already exist with email:", email);
        }

        password = await bcrypt.hash(password, 10);

        const user = await User.create({ firstName, lastName, email, password, role });

        console.log(user);

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId)
            .populate('address');
        // const user = await User.findById(userId).select('-__v -password')

        if (!user) {
            throw new Error("user not found with id:", userId);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email});

        if (!user) {
            throw new Error("user not found with email:", email);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const now = Math.floor(Date.now() / 1000); // Convert current time to seconds

        const user = await findUserById(userId);

        if (!user) {
            throw new Error("User not found with id: " + userId);
        }
        return user;

        // if (exp < now) {
        //     throw new Error('The token has expired!', 401);
        // } else {
        //     const user = await findUserById(userId);

        //     if (!user) {
        //         throw new Error("User not found with id: " + userId);
        //     }
        //     return user;
        // }
    } catch (error) {
        throw new Error(error.message);
    }
}


const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;

    } catch (error) {
        throw new Error(error.message);
    }
}


const deleteUserById = async (userId) => {
    try {
        const user = await findUserById(userId);

        if (!user) {
            throw new Error("Couldn't find user for deletion");
        }

        await User.deleteOne({ _id: userId }); // Using deleteOne() instead of remove()
        return 'User deleted successfully';
    } catch (err) {
        console.error("Error deleting user:", err);
        throw err;
    }
};


module.exports = ({ createUser, getUserByEmail, findUserById, getUserProfileByToken, getAllUsers, deleteUserById });