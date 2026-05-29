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
    },
    refreshToken:{
        type:String,
    }
})

userSchema.pre("save",function(){
    if (!this.isModified("password")) return console.log('password ');
    try {
        return this.password = bcrypt.hashSync(this.password,10)
    } catch (error) {
        console.log(error)
    }
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

let UserModel = mongoose.model("users",userSchema);
module.exports = UserModel