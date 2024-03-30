const mongoose = require('mongoose');

const wishItemSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    wishlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'wishlists', 
    },
})

const WishItem = mongoose.model('wishItems', wishItemSchema);

module.exports = WishItem;