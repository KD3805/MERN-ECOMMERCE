const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwtProvider = require("../config/jwtProvider.js");

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error("user already exist with email:", email);
        }

        password = await bcrypt.hash(password, 10);

        const user = await User.create({ firstName, lastName, email, password });

        console.log(user);

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId)
        // .populate('address');
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
        const user = await User.findOne({email});

        if (!user) {
            throw new Error("user not found with email:", email);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getUserProfileByToken = async(token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);

        const user = await findUserById(userId);

        if (!user) {
            throw new Error("user not found with id:", userId);
        }
        return user;

    } catch (error) {
        throw new Error(error.message);
    }
}

const getAllUsers = async()=>{
    try {
        const users = await User.find();
        return users;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = ({ createUser, getUserByEmail, findUserById, getUserProfileByToken, getAllUsers });