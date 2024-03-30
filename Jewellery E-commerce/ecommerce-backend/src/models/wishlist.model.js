const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    wishItems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'wishItems',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const WishList = mongoose.model('wishlists', wishlistSchema);

module.exports = WishList;