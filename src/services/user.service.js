const ApiError = require("../utils/apiError")
const UserModel = require('../models/user.model')

/**
 * @desc    Register a new user after validating inputs and checking uniqueness
 * @param   {Object} data - Contains name, email, and password
 * @returns {Object} The newly created user document
 */
let registerService = async (data) => {
    let { name, email, password } = data

    if (!name || !email || !password) {
        throw new ApiError(400, 'All fields are required')
    }
    
    // Check if user already exists
    let user = await UserModel.findOne({ email })

    if (user) {
        throw new ApiError(400, 'User already registered')
    }

    let newUser = await UserModel.create({
        name,
        email,
        password, // Assumption: Password hashing is handled in User Schema pre-save hook
    })

    // Security: Return user without password
    const userObject = newUser.toObject()
    delete userObject.password

    return userObject;
}

/**
 * @desc    Authenticate user with email and password
 * @param   {Object} data - Contains email and password
 * @returns {Object} Authenticated user document (excluding password)
 */
let loginService = async (data) => {
    let { email, password } = data

    if (!email || !password) {
        throw new ApiError(400, 'All fields are required')
    }
    
    // Find user by email
    let user = await UserModel.findOne({ email })

    if (!user) {
        throw new ApiError(44, 'User not found')
    }

    // Compare password using instance method from schema
    let isMatch = await user.comparePassword(password)

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials")
    }

    // Security: Convert to object and remove password before returning
    const userObject = user.toObject()
    delete userObject.password

    return userObject;
}

module.exports = {
    registerService,
    loginService,
}