const wishService = require('../services/wishlist.service.js');

const findUserWish = async(req, res) => {
    try {
        const user = await req.user;

        const wish = await wishService.findUserWish(user.id);
        return res.status(200).send(wish);

    } catch (error) {
        console.log("wish controller error::", error)
        return res.status(500).send({error: error.message});   
    }
}

const addWishItem = async(req, res) => {
    try {
        const user = req.user;

        const wishItem = await wishService.addWishItem(user._id, req.body);
        return res.status(200).send(wishItem);
    } catch (error) {
        console.log("Add wishItem controller error::", error)
        return res.status(500).send({error: error.message});   
    }
}

const removeWishItem = async(req, res) => {
    const user = req.user;

    try {

        await wishService.removeWishItem(user._id, req.params.id);
        return res.status(200).send({message: "wish item removed successfully"});

    } catch (error) {
        console.log("Remove wishItem controller error::", error)
        return res.status(500).send({error: error.message});   
    }

}

module.exports = {
    findUserWish,
    addWishItem,
    removeWishItem
}