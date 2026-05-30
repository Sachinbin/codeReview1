const { generateAccessToken, generateRefreshToken } = require("../config/token");
const { registerService, loginService } = require("../services/user.service");
const UserModel = require("../models/user.model"); // Required to update refreshToken in DB
const ApiResponse = require("../utils/apiResponse");
const asyncHnadler = require("../utils/asyncHnadler");

// Cookie configuration for maximum security
const cookieOptions = {
    httpOnly: true, // Frontend JavaScript ise access nahi kar payega (XSS protection)
    secure: process.env.NODE_ENV === "production", // Sirf HTTPS par chalega production me
    sameSite: "strict" // CSRF attacks se bachata hai
};

/**
 * @desc    Register a new user, generate tokens, set secure cookies, and login
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
let registerController = asyncHnadler(async (req, res) => {
    let data = req.body
    
    // 1. User register karein (Ye humein plain object dega bina password ke)
    let newUser = await registerService(data)

    // 2. Tokens generate karein
    let accessToken = await generateAccessToken(newUser._id)
    let refreshToken = await generateRefreshToken(newUser._id)

    // 3. Database me refresh token save karein (Direct UserModel se update karenge)
    await UserModel.findByIdAndUpdate(newUser._id, { refreshToken })

    // 4. Secure cookies set karein
    res.cookie("accessToken", accessToken)
    res.cookie("refreshToken", refreshToken)

    return res.status(201).json(
        new ApiResponse('User created and logged in successfully', newUser)
    )
})

/**
 * @desc    Authenticate user, generate tokens, and set secure cookies
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
let loginController = asyncHnadler(async (req, res) => {
    let data = req.body
    
    // 1. User login check (Plain object bina password ke)
    let user = await loginService(data)

    // 2. Tokens generate karein
    let accessToken = await generateAccessToken(user._id)
    let refreshToken = await generateRefreshToken(user._id)

    // 3. Database me refresh token save karein
    await UserModel.findByIdAndUpdate(user._id, { refreshToken })

    // 4. Secure cookies set karein
    res.cookie("accessToken", accessToken)
    res.cookie("refreshToken", refreshToken)

    return res.status(200).json(
        new ApiResponse('User logged in successfully', user)
    )
})

module.exports = {
    registerController,
    loginController,
}
