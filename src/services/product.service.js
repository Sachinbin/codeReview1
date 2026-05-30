const ApiError = require("../utils/apiError")
const ProductModel = require('../models/product.model')


let createProductService = async (data) => {
    let { name, description, price, image, category } = data

    if (!name || !price) {
        throw new ApiError(400, 'All fields are requird')
    }

    let newProduct = await ProductModel.create({
        name, description, price, image, category,
    })

    return newProduct;

}

let getProductService = async (user) => {
    if (!user) {
        throw new ApiError(400, 'Invalied request')
    }
    let products = await ProductModel.find({ userId: user.id })

    if (!products) {
        throw new ApiError(401, 'product not found')
    }

    return products
}

let updateProductService = async (data, id,user) => {
   
    let { name, description, price, image, category } = data

    if (!name || !price) {
        throw new ApiError(400, 'All fields are requird')
    }
    let product = await ProductModel.findById(id)

    
    if(product.userId.toString() !== user._id.toString()){
        console.log(product.userId)
        console.log(user._id)
        throw new ApiError(403, 'You are not authorized to update this product')
    }

    let updatedProduct = await ProductModel.findByIdAndUpdate(
        id,
        {
           name, 
           description, 
           price, 
           image, 
           category 
        },
        {
            new:true,
            runValidators:true
        }
    )
    return updatedProduct
}

let deleteProductService = async (id,user) => {
   
    let product = await ProductModel.findById(id)

    if(product.userId.toString() !== user._id.toString()){
        throw new ApiError (403,"you are not authorized user to detete this product")
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