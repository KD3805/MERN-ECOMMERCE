const cartItemService = require('../services/cartItem.service.js');

const updateCartItem = async(req, res) => {
    const user = await req.user;
    // const { quantity, price } = req.body;

    try {
        const updatedItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updatedItem);

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const removeCartItem = async(req, res) => {
    const user = await req.user;

    try {
        await cartItemService.removeCartItem(user._id, req.params.id);
        return res.status(200).send({message: "cart item removed successfully"});

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {updateCartItem, removeCartItem};

