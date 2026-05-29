const { generateAccessToken, generateRefreshToken } = require("../config/token");
const { registerService, loginService } = require("../services/user.service");
const ApiResponse = require("../utils/apiResponse");
const asyncHnadler = require("../utils/asyncHnadler");

let registerController = asyncHnadler(async (req, res) => {
    let data = req.body
    let newUser = await registerService(data)

    let accessToken = await generateAccessToken(newUser._id)
    let refreshToken = await generateRefreshToken(newUser._id)

    newUser.refreshToken = refreshToken
    await newUser.save()

    res.cookie("accessToken",accessToken)
    res.cookie("refreshToken",refreshToken)

    return res.status(201).json(new ApiResponse('user created successfuly',newUser))
}
)

let loginController = asyncHnadler(async (req, res) => {
    let data = req.body
    let user = await loginService(data)

    let accessToken = await generateAccessToken(user._id)
    let refreshToken = await generateRefreshToken(user._id)

    user.refreshToken = refreshToken
    await user.save()

    res.cookie("accessToken",accessToken)
    res.cookie("refreshToken",refreshToken)

    return res.status(200).json(new ApiResponse('user Logged In successfuly',user))
}
)

module.exports = {
    registerController,
    loginController,
}
