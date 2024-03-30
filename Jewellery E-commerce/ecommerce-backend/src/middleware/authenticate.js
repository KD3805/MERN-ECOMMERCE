// authenticate.js (middleware)

const jwtProvider = require('../config/jwtProvider.js');
const userService = require('../services/user.service.js');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(404).send({ error: "Token not found..." });
        }

        const userId = jwtProvider.getUserIdFromToken(token);

        // Ensure that token verification is done properly
        if (!userId) {
            return res.status(403).send({ error: "Invalid token..." });
        }

        // Here, we assume the token is valid, proceed to find the user
        const user = await userService.findUserById(userId);

        if (!user) {
            return res.status(404).send({ error: "User not found..." });
        }

        req.user = user;

    } catch (error) {
        // If any error occurs during token verification or user lookup
        return res.status(500).send({ error: error.message, statusCode: 600 });
    }
    next();
}

module.exports = authenticate;
