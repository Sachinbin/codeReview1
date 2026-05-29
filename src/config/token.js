let jwt  = require('jsonwebtoken')

let generateAccessToken = (userId) =>{
    return jwt.sign(
        {id:userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1h'}
    )
}


let generateRefreshToken = (userId) =>{
    return jwt.sign(
        {id:userId},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:'1d'}
    )
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}