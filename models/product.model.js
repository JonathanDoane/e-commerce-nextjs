import { Schema, model, models } from "mongoose"

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product Name is required"],
        minLength: [2, "Product Name must be longer than 2 characters"],
        maxLength: [40, "Product Name must not exceed 40 characters"]
    },
    description: {
        type: String,
        required: [true, "Product Description is required"],
        minLength: [2, "Product Description must be longer than 2 characters"],
    },
    price: {
        type: Number,
        required: [true, "Product Price is required"]
    }

}, {timestamps: true})

export const Product = models.Product || model('Product', ProductSchema)