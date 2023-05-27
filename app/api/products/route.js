
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product.model";



export async function POST(req){
    mongooseConnect();
    const body = await req.json();
    const newProduct = new Product(body);
    await newProduct.save();

    return new Response(JSON.stringify(newProduct))
        }
        



//trying to fix await error 1:04:30