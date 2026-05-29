const UserModel = require("../models/user.model")
const ApiError = require("../utils/apiError")
const jwt = require('jsonwebtoken')

let authMiddleware = async (req,res,next) => {
    let accessToken = req.cookies.accessToken

    if(!accessToken){
        throw new ApiError(404,'token not found')
    }

    let decode = await jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)

    let user = await UserModel.findById(decode.id)

    if(!user){
        throw new ApiError(404,'user not found')
    }
    // console.log(user)
    req.user = user
    next()
}

module.exports = authMiddleware
