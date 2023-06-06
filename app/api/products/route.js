
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product.model";







export async function POST(req) {

  const body = await req.text()

  const newProduct = new Product(JSON.parse(body));

  const savedProduct = await newProduct.save();

  return new Response(JSON.stringify(savedProduct));

}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  console.log(id);
  
  const body = await req.json()


  const updatedProduct = await Product.findByIdAndUpdate({_id: id}, body, {new: true})


  return new Response(JSON.stringify(updatedProduct));
}



export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const productID = searchParams.get('id')

  await mongooseConnect();

  if (productID) {
    const product = await Product.findById(productID);
    //console.log(product);
    return new Response(JSON.stringify(product));
  } else {
    const products = await Product.find();
    return new Response(JSON.stringify(products))
  }
}






export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');


  const deletedProduct = await Product.findByIdAndDelete(id)
  return new Response(JSON.stringify(deletedProduct))

}
