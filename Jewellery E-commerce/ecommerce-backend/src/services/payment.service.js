const razorpay = require("../config/razorpayClient.js");
const orderService = require("../services/order.service.js");
const { removeAllCartItems } = require("./cart.service.js");

const createPaymentLink = async(orderId) => {

    try {
        const order = await orderService.findOrderById(orderId);

        const paymentLinkRequest = {
            amount: order.totalPrice*100,
            currency: "INR",
            customer: {
                name: order.user.firstName + "  " + order.user.lastName,
                email: order.user.email,
                contact: order.user.mobile,
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            // callback_url: `http://localhost:3000/payment/${orderId}`,
            callback_url: `http://localhost:3000/user-details/?layout=2`,
            callback_method: 'get',

        };

        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);  
        
        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        }

        return resData;

    } catch (error) {
        throw new Error(error.message);
    }
}

const updatePaymentInformation = async(reqData) => {

    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;

    try {
        const order = await orderService.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);

        if(payment.status == "captured") {
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.paymentStatus = "COMPLETED";
            order.orderStatus = "PLACED";
            order.deliveryDate = Date.now();
            await removeAllCartItems(order.user._id);

            await order.save();
        }

        const resData = {message: "Your order is placed", success: true};

        return resData;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation
}