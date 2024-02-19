const Category = require("../models/category.model");
const Product = require("../models/product.model");


async function createProduct(reqData) {
    let topLevel = await Category.findOne({name: reqData.topLevelCategory});

    if(!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        })

        await topLevel.save();
    }

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    })

    if(!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        })

        await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    })

    if(!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        })

        await thirdLevel.save();
    }

    const product = new Product({
        title: reqData.title,
        description: reqData.description,
        details: reqData.details,
        occasion: reqData.occasion,
        color: reqData.color,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        discountPercent: reqData.discountPercent,
        sizes: reqData.size,
        imageUrls: reqData.imageUrl,
        brand: reqData.brand,
        quantity: reqData.quantity,
        category: thirdLevel._id,
    })

    return await product.save();
}

async function deleteProduct(productId) {
    try {
        const product = await findProductById(productId);

        await Product.findByIdAndUpdate(productId);
        return "Product deleted successfully";
    } catch (error) {
        throw new Error(error.message);       
    }
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();

    if(!product) {
        throw new Error("Product not found with id: "+ id);
    }
    return product;
}


// Get all products from a specific category 

async function getAllProducts(reqQuery) {
    let {
        category, // product-name
        parentCategory, // jewellery-type (gold, diamond, ...)
        color,
        minPrice,
        maxPrice,
        minDiscount,
        maxDiscount,
        occasion,
        sort,
        stock,
        pageNumber,
        pageSize, // total products in 1 page
    } = reqQuery;

    pageSize = pageSize || 10;

    let query = Product.find().populate("category");    // populate the reference to Category model

    if(category) {
        const existCategory = await Category.findOne({name: category});

        if(existCategory) {
            query = query.where("category").equals(existCategory._id);
        }
        else {
            return {content: [], currentPage: 1, totalPages: 0}
        }
    }

    if(parentCategory) {
        const existParentCategory = await Category.findOne({name: parentCategory});

        if(existParentCategory) {
            query = query.where("category").equals(existParentCategory._id);
        }
        else {
            return {content: [], currentPage: 1, totalPages: 0}
        }
    }

    if(color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));

        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

        query = query.where("color").regex(colorRegex);
    }

    if(occasion) {
        const occasionSet = new Set(occasion.split(",").map(occasion => occasion.trim().toLowerCase()));

        const occasionRegex = occasionSet.size > 0 ? new RegExp([...occasionSet].join("|"), "i") : null;

        query = query.where("occasion").regex(occasionRegex);
    }

    if(minPrice && maxPrice) {
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice)
    }

    if(minDiscount && maxDiscount) {
        query = query.where('discountPercent').gte(minDiscount).lte(maxDiscount)
    }

    if(stock) {
        if(stock === 'in_stock') {
            query = query.where('quantity').gt(0);
        }
        else if(stock === 'out_of_stock') {
            query = query.where('quantity').eq(0);
        }
    }

    if(sort) {
        const sortDirection = sort === 'price_high' ? -1 : 1;
        query = query.sort({"discountedPrice": sortDirection});
    }

    const totalProducts = await Product.countDocuments(query);

    const skip = (pageNumber - 1)*pageSize;
    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts/pageSize);

    return {content: products, currentPage: pageNumber, totalPages};
}

async function createMultipleProducts(products) {
    for(let product of products) {
        await createProduct(product);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProducts
}