const Address = require('../models/address.model.js');
const Order = require('../models/order.model.js');
const OrderItem = require('../models/orderItems.model.js');
const cartService = require('../services/cart.service.js');
 
async function createOrder(user, shippAddress) {
    let address;

    if (shippAddress._id) {
        let existAddress = await Address.findById(shippAddress._id);
        address = existAddress;
    }
    else {
        address = new Address(shippAddress);
        address.user = user;

        await address.save();
        
        user.address.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (let item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            weight: item.weight,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        })

        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippingAddress: address,
    })

    const savedOrder = await createdOrder.save();

    return savedOrder;
}


// Below methods are for admin
async function placeOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "PLACED";
    order.user.paymentDeatils.status = "COMPLETED";

    return await order.save();
}

async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CONFIRMED";

    return await order.save();
}

async function shippedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "SHIPPED";

    return await order.save();
}

async function deliveredOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "DELIVERED";

    return await order.save();
}

async function cancelledOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderStatus = "CANCELED";

    return await order.save();
}

async function findOrderById(orderId) {
    const order = Order.findById(orderId)
    .populate("user")
    .populate({path: "orderItems", populate: {path: "product"}})
    .populate("shippingAddress")

    return order;
}

async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({user: userId})
        .populate({path: "orderItems", populate: {path: "product"}}).lean();

        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders() {
    try {
        return await Order.find()
        .populate({path: "orderItems", populate: {path: "product"}})
        .populate('user')
        .lean();
    } catch (error) {
        throw new Error(error);
    }
}

async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    cancelledOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder
}
