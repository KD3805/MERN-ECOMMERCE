// jwtProvider.js

const jwt = require("jsonwebtoken");

const SECRET_KEY = "asdawefaerfqermnvfnwerknfkdjcnqwekjnfn3k"

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
    return token;
}

const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId; //return the user id from the payload of the token
    } catch (error) {
        // If token verification fails
        return null;
    }
}

module.exports = { generateToken, getUserIdFromToken };
