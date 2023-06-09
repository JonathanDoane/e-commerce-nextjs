import { Schema,model,models } from "mongoose";

const CategorySchema = new Schema({
        category: {
            type: String,
            required: [true, "Category is required"],
            minLength: [2, "Category must be longer than 2 characters"],
            maxLength: [40, "Category must not exceed 40 characters"]
        },
    },{timestamps: true})

    export const Category = models?.Category || model('Category', CategorySchema)