import { Category } from "@/models/category.model";
import { mongooseConnect } from "@/lib/mongoose";


export async function POST(req, res) {
    await mongooseConnect();
    const category = await req.json();
    console.log(category)
    const newCategory = await Category.create(category)
    const savedCategory = await newCategory.save()
    return new Response(JSON.stringify(savedCategory))
}



export async function GET(req, res) {
    const categories = await Category.find();
    return new Response(JSON.stringify(categories))
}