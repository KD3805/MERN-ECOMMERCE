const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user) {
    try {
        const cart = new Cart({user});
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({user: userId});
        
        let cartItems = await CartItem.find({cart:cart._id}).populate("product");
        
        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for(let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.discount = Math.floor(((totalPrice - totalDiscountedPrice) / totalPrice) * 100);

        return cart;

    } catch (error) {
        throw new Error(error.message);
    }
}

async function addCartItem(userId, req) {
    try {
        const cart = await Cart.findOne({user:userId});
        const product = await Product.findById(req.productId);

        const isPresent = await CartItem.findOne({cart: cart._id, product: product._id, userId});

        if(!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                weight: req.weight,
                size: req.size,
                discountedPrice: product.discountedPrice,
            })

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();

            return createdCartItem;
        } else {
            return isPresent;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {createCart, addCartItem, findUserCart};