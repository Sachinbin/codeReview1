const { default: mongoose } = require("mongoose");

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    image: {
        type: Array, // You can also use [String] for better specificity
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This must match the name you gave your User model
    }
}, { timestamps: true }); // Adding timestamps is highly recommended for products


let ProductModel = mongoose.model("Products", productSchema);
module.exports = ProductModel;
