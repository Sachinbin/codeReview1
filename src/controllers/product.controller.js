const { createProductService } = require("../services/product.service")
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

// let loginController = asyncHnadler(async (req, res) => {
//     let data = req.body
//     let user = await loginService(data)

//     let accessToken = await generateAccessToken(user._id)
//     let refreshToken = await generateRefreshToken(user._id)

//     user.refreshToken = refreshToken
//     await user.save()

//     res.cookie("accessToken",accessToken)
//     res.cookie("refreshToken",refreshToken)

//     return res.status(200).json(new ApiResponse('user Logged In successfuly',user))
// }
// )

module.exports = {
    createProductController
}