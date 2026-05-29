const ApiError = require("../utils/apiError")
const UserModel = require('../models/user.model')

let registerService = async (data) => {
    let {name,email,password} = data

    if(!name || !email || !password ){
        throw new ApiError(400,'All fields are requird')
    }
    let user = await UserModel.findOne({email})

    if(user){
        throw new ApiError(400,'User already registred')
    }

    let newUser = await UserModel.create({
        name,
        email,
        password,
    })

    return newUser;

}

let loginService = async (data) => {
    let {email,password} = data

    if(!email || !password ){
        throw new ApiError(400,'All fields are requird')
    }
    let user = await UserModel.findOne({email})

    if(!user){
        throw new ApiError(404,'User not found')
    }

    let isMatch = await user.comparePassword(password)

    if(!isMatch){
        throw new ApiError(401,"Invalid credentials")
    }

    return user;

}

module.exports = {
    registerService,
    loginService,
}