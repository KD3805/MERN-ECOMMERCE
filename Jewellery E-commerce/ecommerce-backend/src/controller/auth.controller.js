const userService = require('../services/user.service.js');
const jwtProvider = require('../config/jwtProvider.js');
const bcrypt = require('bcrypt');
const cartService = require("../services/cart.service.js");
const wishService = require('../services/wishlist.service.js');

const register = async(req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);
        
        await cartService.createCart(user);
        await wishService.createWish(user);

        return res.status(200).send({jwt, message: "register success"});

    } catch (error) {
        return res.status(500).send({error: error.message, statusCode: 500});
    }
}

const login = async(req, res) => {
    const {email, password} = req.body;
    console.log("req.body in login::auth.controller", req.body)
    
    try {
        const user = await userService.getUserByEmail(email);
        console.log("user in login::auth.controller", user)

        if(!user){
            return res.status(404).send({message: 'user not found with email: hello', email});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).send({message: 'Invalid Password...'});
        }

        const jwt = jwtProvider.generateToken(user._id);

        return res.status(200).send({jwt, message: 'login success', role: user.role});

    } catch (error) {
        return res.status(500).send({error: error.message, statusCode: 500});
    }
}

module.exports = {register, login}