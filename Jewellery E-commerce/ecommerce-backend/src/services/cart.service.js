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

async function calculateTotals(cart) {
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;

    for (let cartItem of cart.cartItems) {
        totalPrice += cartItem.price;
        totalDiscountedPrice += cartItem.discountedPrice;
        totalItem += cartItem.quantity;
    }

    return {
        totalPrice,
        totalItem,
        totalDiscountedPrice,
        discount: Math.floor(((totalPrice - totalDiscountedPrice) / totalPrice) * 100),
    };
}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({user: userId});
        
        let cartItems = await CartItem.find({cart:cart._id}).populate("product");
        
        cart.cartItems = cartItems;

        const totals = await calculateTotals(cart);
        Object.assign(cart, totals);

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
        console.log("isPresent in cart.service", isPresent)

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

async function removeAllCartItems(userId) {
    try {
        let cart = await Cart.findOne({user: userId});
        
        cart.cartItems.length = 0;
        console.log("removeAllCartItems called :: and cart.cartItems ::", cart.cartItems)

        const totals = {
            totalPrice: 0,
            totalItem: 0,
            totalDiscountedPrice: 0,
            discount: Math.floor(((totalPrice - totalDiscountedPrice) / totalPrice) * 100),
        };
        Object.assign(cart, totals);
        await cart.save();
        console.log("removeAllCartItems called :: and cart.save() ::", cart)

        return cart;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {createCart, addCartItem, findUserCart, removeAllCartItems};