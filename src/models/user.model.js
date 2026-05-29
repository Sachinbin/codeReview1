const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unquie:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})

userSchema.pre("save",function(next){
    if (!this.isModified("password")) return next();
    try {
        return this.password = bcrypt.hashSync(this.password,10)
    } catch (error) {
        next(error)
    }
})

userSchema.methods.comparePassword = function(password){
    let res = bcrypt.compareSync(password,this.password)
    return res
}

let UserModel = mongoose.model("users",userSchema);
module.exports = UserModel