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
        });

        const createdReview = await review.save();
        product.reviews.push(createdReview._id);
        await product.save();

        return createdReview;
    } catch (error) {
        throw new Error(`Error while creating review: ${error.message}`);
    }
}

async function getAllReview(productId) {
    try {
        const reviews = await Review.find({ product: productId }).populate("user");
        return reviews;
    } catch (error) {
        throw new Error(`Error while fetching reviews: ${error.message}`);
    }
}

module.exports = {
    createReview,
    getAllReview
};
