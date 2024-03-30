const WishList = require('../models/wishlist.model');
const WishItem = require('../models/wishItem.model');
const Product = require('../models/product.model');
const userService = require('../services/user.service.js');

async function createWish(user) {
    try {
        const wish = new WishList({ user });
        const createdWish = await wish.save();
        return createdWish;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserWish(userId) {
    try {
        let wish = await WishList.findOne({ user: userId });

        if (!wish) {
            await createWish(userId);
        }

        let wishItems = await WishItem.find({ wishlist: wish._id }).populate('product');
        wish.wishItems = wishItems;

        return wish;

    } catch (error) {
        throw new Error(error.message);
    }
}

async function addWishItem(userId, req) {
    try {
        const wish = await WishList.findOne({ user: userId });
        const product = await Product.findById(req.productId);
        
        const isPresent = await WishItem.findOne({ wishlist: wish._id, product: product._id, user: userId })
        
        if (!isPresent) {
            const wishItem = new WishItem({
                product: product._id,
                wishlist: wish._id,
                user: userId,
            })

            const createdWishItem = await wishItem.save();
            wish.wishItems.push(createdWishItem);
            await wish.save();

            console.log("createdWishItem", createdWishItem)
            return createdWishItem;
        }
        else {
            return isPresent;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findWishItemById(wishItemId) {
    try {
        const item = await WishItem.findById(wishItemId).populate('product').populate('user');

        if (!item) {
            throw new Error(`No wish item with the id of "${cartItemId}"`);
        }
        return item;

    } catch (error) {
        throw new Error(error.message);
    }
}

async function removeWishItem(userId, wishProductId) {
    try {
        // const wishItem = await findWishItemById(wishItemId);

        const wish = await WishList.findOne({ user: userId });
        // const product = await Product.findById(wishProductId);

        const delWish = await WishItem.findOne({ wishlist: wish._id, product: wishProductId, user: userId })
        wish.wishItems.remove(delWish._id);
        await wish.save();
        await WishItem.deleteOne({ _id: delWish._id });

        if (!delWish) {
            throw new NotFoundError('The wish item does not exist') 
        }

        return delWish;        

        // if (user._id.toString() === wishItem.user.toString()) {
        //     await WishItem.findByIdAndDelete(wishItemId);
        //     return `wish item with id ${wishProductId} removed successfully!`;
        // }

    } catch (error) {
        throw new Error("you can't remove another user's item");
    }
}

module.exports = { createWish, findUserWish, addWishItem, findWishItemById, removeWishItem };