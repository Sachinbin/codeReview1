const { createProductService, getProductService, updateProductService } = require("../services/product.service")
const ApiResponse = require("../utils/apiResponse")
const asyncHnadler = require("../utils/asyncHnadler")


let createProductController = asyncHnadler(async (req, res) => {
    let data = req.body
    let newProduct = await createProductService(data)

    let user = req.user
    newProduct.userId = user._id
    await newProduct.save()

    return res.status(201).json(new ApiResponse('product created successfuly',newProduct))
}
)

let getProductController = asyncHnadler(async (req, res) => {
    let user = req.user
    let product = await getProductService(user)
    return res.status(200).json(new ApiResponse('all products',product))
}
)

let updateProductController = asyncHnadler(async (req,res) => {
    let data = req.body
    let {id} = req.params;
    let user = req.user
    
    let updatedProduct = await updateProductService(data,id,user)

     return res.status(201).json(new ApiResponse('product updated successfuly',newProduct))
})



module.exports = {
    createProductController,
    getProductController,
    updateProductController,
}