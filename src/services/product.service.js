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
            new:true
        }
    )
    return products
}

module.exports = {
    createProductService,
    getProductService,
    updateProductService
}