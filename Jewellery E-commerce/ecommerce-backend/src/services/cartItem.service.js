const CartItem = require('../models/cartItem.model');
const userService = require('../services/user.service.js');

// No need to create a function for add cart-item

async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const item = await findCartItemById(cartItemId);
        
        if (!item) {
            throw new Error(`The cart item with the id ${cartItemId} does not exist.`);
        }
        
        const user = await userService.findUserById(item.userId);

        if(!user) {
            throw new Error("user not found with id:", userId);
        }

        if(user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;

            const updateCartItem = await item.save();

            return updateCartItem;
        }
        else {
            throw new Error("you can't update this cart item!!");
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

async function removeCartItem(userId, cartItemId) {
    const cartItem = await findCartItemById(cartItemId);
    const user = await userService.findUserById(userId);

    if(user._id.toString() === cartItem.userId.toString()) {
        await CartItem.findByIdAndDelete(cartItemId);
        return `cart item with id ${cartItemId} removed successfully!`;
    }
    else {
        throw new Error("you can't remove another user's item");
    }
}

async function findCartItemById(cartItemId) {
    try {
        const item = await CartItem.findById(cartItemId).populate('product');

        if(!item) {
            throw new Error(`No cart item with the id of "${cartItemId}"`);
        }   
        return item; 

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
}