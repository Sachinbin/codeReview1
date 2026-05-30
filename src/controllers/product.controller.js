const { createProductService, getProductService, updateProductService, deleteProductService } = require("../services/product.service")
const ApiResponse = require("../utils/apiResponse")
const asyncHnadler = require("../utils/asyncHnadler")

/**
 * @desc    Create a new product and associate it with the logged-in user
 * @route   POST /api/v1/products
 * @access  Private (Authenticated Users)
 */
let createProductController = asyncHnadler(async (req, res) => {
    let data = req.body
    let newProduct = await createProductService(data)

    let user = req.user
    newProduct.userId = user._id
    await newProduct.save()

    return res.status(201).json(new ApiResponse('product created successfuly', newProduct))
})

/**
 * @desc    Get all products belonging to the logged-in user
 * @route   GET /api/v1/products
 * @access  Private (Authenticated Users)
 */
let getProductController = asyncHnadler(async (req, res) => {
    let user = req.user
    let product = await getProductService(user)
    return res.status(200).json(new ApiResponse('all products', product))
})

/**
 * @desc    Update a specific product by ID (Checks ownership inside service)
 * @route   PUT /api/v1/products/:id
 * @access  Private (Owner Only)
 */
let updateProductController = asyncHnadler(async (req, res) => {
    let data = req.body
    let { id } = req.params;
    let user = req.user

    let updatedProduct = await updateProductService(data, id, user)

    return res.status(201).json(new ApiResponse('product updated successfuly', updatedProduct))
})

/**
 * @desc    Delete a specific product by ID (Checks ownership inside service)
 * @route   DELETE /api/v1/products/:id
 * @access  Private (Owner Only)
 */
let deleteProductController = asyncHnadler(async (req, res) => {
    let { id } = req.params;
    let user = req.user

    let deletedProduct = await deleteProductService(id, user)

    return res.status(201).json(new ApiResponse('product deleted successfuly', deletedProduct))
})

module.exports = {
    createProductController,
    getProductController,
    updateProductController,
    deleteProductController
}