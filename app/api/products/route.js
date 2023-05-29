
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product.model";



export async function GET(req) {
    const {searchParams} = new URL(req.url)
    const productID = searchParams.get('id')
    await mongooseConnect();
    
    if(productID) {
         const product = await Product.findById(productID);
        //console.log(product);
        return new Response(JSON.stringify(product));
    } else {
        const products = await Product.find();
        return new Response(JSON.stringify(products))
    }
}






export async function POST(req){
    mongooseConnect();
    
    const body = await req.json();
    const newProduct = new Product(body);
    await newProduct.save();

    return new Response(JSON.stringify(newProduct))
        }
        



