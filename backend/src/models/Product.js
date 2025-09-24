import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
        },
        imageUrl: {
            type: String
        }
    }
)