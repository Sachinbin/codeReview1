const ApiError = require("../utils/apiError")
const ProductModel = require('../models/product.model')

/**
 * @desc    Create a new product with the provided data and owner's ID
 * @param   {Object} data - Contains product details including userId
 * @returns {Object} The newly created product document
 */
let createProductService = async (data) => {
    // Hum direct data se hi userId nikal lenge jo controller bhej raha hai
    let { name, description, price, image, category, userId } = data

    if (!name || !price || !userId) {
        throw new ApiError(400, 'Name, Price, and User ID are required')
    }

    // Ek hi baar mein complete document create ho jayega
    let newProduct = await ProductModel.create({
        name, description, price, image, category, userId
    })

    return newProduct;
}

/**
 * @desc    Fetch all products created by a specific user
 * @param   {Object} user - The authenticated user object from request
 * @returns {Array}  List of products belonging to the user
 */
let getProductService = async (user) => {
    if (!user?._id) {
        throw new ApiError(400, 'Invalid request. User not authenticated.')
    }
    
    // user.id ki jagah user._id use karna zyada safe hai
    let products = await ProductModel.find({ userId: user._id })

    // Note: Empty array [] query success par milta hai, isliye null check ke bajay length check sahi hai
    if (!products) {
        throw new ApiError(404, 'Products not found')
    }

    return products
}

/**
 * @desc    Update a product after verifying ownership
 * @param   {Object} data - Updated product fields
 * @param   {String} id - Product ID to update
 * @param   {Object} user - Logged-in user object for security check
 * @returns {Object} The updated product document
 */
let updateProductService = async (data, id, user) => {
   
    let { name, description, price, image, category } = data

    if (!name || !price) {
        throw new ApiError(400, 'All fields are required')
    }
    
    let product = await ProductModel.findById(id)

    if (!product) {
        throw new ApiError(404, 'Product not found')
    }
    
    // Ownership Check
    if (product.userId.toString() !== user._id.toString()) {
        throw new ApiError(403, 'You are not authorized to update this product')
    }

    let updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        { name, description, price, image, category },
        {
            new: true,
            runValidators: true
        }
    )
    return updatedProduct
}

/**
 * @desc    Delete a product after verifying ownership
 * @param   {String} id - Product ID to delete
 * @param   {Object} user - Logged-in user object for security check
 * @returns {Object} The deleted product document
 */
let deleteProductService = async (id, user) => {
   
    let product = await ProductModel.findById(id)

    if (!product) {
        throw new ApiError(404, 'Product not found')
    }

    // Ownership Check
    if (product.userId.toString() !== user._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this product")
    }

    let deletedProduct = await ProductModel.findByIdAndDelete(id)

    return deletedProduct
}

module.exports = {
    createProductService,
    getProductService,
    updateProductService,
    deleteProductService,
}