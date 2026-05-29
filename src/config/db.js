const mongoose = require("mongoose")

let connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected')
    } catch (error) {
        console.log('Database connection failed',error)
    }
}

module.exports = connectDB