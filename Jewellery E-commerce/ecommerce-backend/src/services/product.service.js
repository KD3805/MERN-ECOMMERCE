const Category = require("../models/category.model");
const Product = require("../models/product.model");

async function createProduct(reqData) {

    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    if (!topLevel) {
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

    if (!secondLevel) {
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

    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        })

        await thirdLevel.save();
    }

    console.log("thirdLevel._id:", thirdLevel._id)

    const product = new Product({
        title: reqData.title,
        description: reqData.description,
        details: reqData.details,
        occasion: reqData.occasion,
        type: reqData.type,
        color: reqData.color,
        price: reqData.price,
        discountedPrice: reqData.discountedPrice,
        discountPercent: Math.floor(((reqData.price - reqData.discountedPrice) / reqData.price) * 100),
        sizes: reqData.sizes,
        imageUrls: reqData.imageUrls,
        brand: reqData.brand,
        quantity: reqData.quantity,
        category: thirdLevel._id,
    })

    return await product.save();
}

async function deleteProduct(productId) {
    try {
        // const product = await findProductById(productId);

        await Product.findByIdAndDelete(productId);
        return "Product deleted successfully";
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(id) {
    try {
        const product = await Product.findById(id)
            .populate("category")
            // .populate({ path: "category", populate: { path: "parentCategory" } })
            .populate("reviews")
            .populate("ratings")
            .populate({ path: 'reviews', populate: { path: 'user' } })
            .exec();

        if (!product) {
            throw new Error("Product not found with id: " + id);
        }
        return product;
    } catch (error) {
        throw new Error(error.message);
    }
}


// Get all products from a specific category 

async function getAllProducts(reqQuery) {
    let {
        category, // product-name
        type, // jewellery-type (gold, diamond, ...)
        color,
        minPrice,
        maxPrice,
        minDiscount,
        maxDiscount,
        occasion,
        sort,
        // stock,
        pageNumber,
        pageSize, // total products in 1 page
    } = reqQuery;

    pageSize = parseInt(pageSize) || 12;
    pageNumber = parseInt(pageNumber);

    let query = Product.find()
        .populate("category")
        .populate({ path: "category", populate: { path: "parentCategory" } })
    // populate the reference to Category model


    // -------------------- Filter by Category ---------------

    if (category !== 'jewellery') {
        const existCategories = await Category.find({ name: category })

        const categoryIds = existCategories.map(cat => cat._id);

        if (existCategories.length > 0) {
            query = query.where("category").in(categoryIds);
        }
        else {
            console.log("No such category!", category);
            return { content: [], currentPage: 1, totalPages: 0 }
        }
    }

    // -------------------- Filter by Type ---------------

    if (type != '' && type != null) {
        const typeSet = new Set(type.split(",").map(type => type.trim().toLowerCase()));

        const typeRegex = typeSet.size > 0 ? new RegExp([...typeSet].join("|"), "i") : null;

        query = query.where("type").regex(typeRegex);
    }

    // -------------------- Filter by Color ---------------

    if (color != '' && color != null) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));

        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

        query = query.where("color").regex(colorRegex);
    }

    // -------------------- Filter by Occasion ---------------

    if (occasion != '' && occasion != null) {
        const occasionSet = new Set(occasion.split(",").map(occasion => occasion.trim().toLowerCase()));

        const occasionRegex = occasionSet.size > 0 ? new RegExp([...occasionSet].join("|"), "i") : null;

        query = query.where("occasion").regex(occasionRegex);
    }

    // -------------------- Filter by Price ---------------    

    if (minPrice && maxPrice) {
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice)
    }

    if (minDiscount && maxDiscount) {
        query = query.where('discountPercent').gte(minDiscount).lte(maxDiscount)
    }

    // if (stock) {
    //     if (stock === 'in_stock') {
    //         query = query.where('quantity').gt(0);
    //     }
    //     else if (stock === 'out_of_stock') {
    //         query = query.where('quantity').eq(0);
    //     }
    // }

    if (sort) {
        const sortDirection = sort === 'low_to_high' ? 1 : -1;
        query = query.sort({ "discountedPrice": sortDirection });
    }

    // -------------------- Execute query ---------------

    const totalProducts = await Product.countDocuments(query);
    // console.log("total prods: "+ totalProducts);

    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);
    // console.log("Final query:", query._conditions);  // Log the final query conditions

    const products = await query.exec();

    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages };
}

async function createMultipleProducts(products) {
    for (let product of products) {
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