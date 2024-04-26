const Review = require('../models/review.model');
const productService = require('../services/product.service.js');


async function createReview(reqData, user) {
    try {
        const product = await productService.findProductById(reqData.productId);

        const review = new Review({
            user: user._id,
            product: product._id,
            review: reqData.review,
            createdAt: new Date(),
        })

        const createdReview = await review.save();
        product.reviews.push(createdReview._id);
        await product.save();

        return createdReview;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllReview(productId) {
    // const product = await productService.findProductById(reqData.productId);

    return await Review.find({ product: productId }).populate("user");
}

module.exports = {
    createReview,
    getAllReview
}