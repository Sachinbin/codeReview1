const ApiError = require("../utils/apiError")
const jwt = require('jsonwebtoken')

let authMiddleware = async (req,res,next) => {
    let accessToken = req.cookies.accessToken

    if(!accessToken){
        throw new ApiError(404,'token not found')
    }

    let decode = jwt.verify(accessToken,process.env.REFRESH_TOKEN_SECRET)

    console.log(decode)
}
