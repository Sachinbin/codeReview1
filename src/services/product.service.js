const ApiError = require("../utils/apiError")
const ProductModel = require('../models/product.model')


let createProductService = async (data) => {
    let {name,description,price,image,category} = data

    if(!name || !price ){
        throw new ApiError(400,'All fields are requird')
    }

    let newProduct = await ProductModel.create({
        name,description,price,image,category,
    })

    return newProduct;

}

// let loginService = async (data) => {
//     let {email,password} = data

//     if(!email || !password ){
//         throw new ApiError(400,'All fields are requird')
//     }
//     let user = await UserModel.findOne({email})

//     if(!user){
//         throw new ApiError(404,'User not found')
//     }

//     let isMatch = await user.comparePassword(password)

//     if(!isMatch){
//         throw new ApiError(401,"Invalid credentials")
//     }

//     return user;

// }

module.exports = {
   createProductService
}