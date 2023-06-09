'use client'
import Layout from "@/app/components/layout";
import { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";

    export default  function EditProductPage({params}) {

        const {id} = params
        const [products, setProducts] = useState({ name: '', description: '', price: '', file:null})
        //console.log(id)

        useEffect(() => {
            axios.get(`/api/products?id=${id}`)
            .then((res) => {setProducts(res.data);console.log(res.data)})
            .catch((err)=> {console.log(err)})
        },[])

        const inputHandler = (e) => {
            setProducts({...products, [e.target.name]: e.target.value })
        }

        const handleFileChange = async (e) => {
            const file = e.target.files[0];
            console.log('File:', file);
            const buffer = await file.arrayBuffer();
            const bufferString = Buffer.from(buffer).toString('base64');
            console.log('Buffer:', buffer);
            setProducts({
                ...products,
                file: bufferString
            });
        }
        const router = useRouter();
    
    function UpdateProduct(e){
        e.preventDefault()

        
        axios.put(`/api/products?id=${id}`,products, {headers: {'Content-Type': products.file.type}})
        .then((res)=> {console.log('Success:', res); 
        router.push('/products')})
        .catch((err)=> {console.log(err)})
        
    }
    
    const data = products.file

    return (
        <Layout>
            <div className="flex w-1/4 justify-between">
                <h1 className=" bg-blue-900 rounded-lg w-3/4 mt-5 text-center text-white pb-3 p-2 text-4xl">Edit Product</h1>
                <Link href = {'/products/'} className="simple"> Go Back </Link>
                </div>
                <form onSubmit={UpdateProduct} className="flex flex-col">
                <label htmlFor="name">Product Name</label>
                <input type="text" placeholder="Product Name" name="name" value={products.name} onChange={inputHandler}/>

                <label htmlFor="description">Description</label>
                <textarea placeholder="Description" name="description" value={products.description} onChange={inputHandler}></textarea>

                <label htmlFor="price">Price (in USD) </label>
                <input type="number" placeholder="Price" name="price" value={products.price} onChange={inputHandler}/>

                <label htmlFor="images">Photos</label>
                <div className="flex justify-between w-1/4">
                    <label className="w-24 h-24 flex items-center justify-center gap-1 text-sm text-black
                    mb-5 rounded-lg bg-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        Upload
                        <input type="file" className="hidden" onChange={handleFileChange} name="file" multiple/>
                    </label>
                    <img src={`data:image/png;base64,${data}`} alt="" className="h-32 border-black border-2 p-1"/>
                </div>

                <button type="submit" className="btn-primary">Update Product</button>
            </form>
            
        </Layout>
    )
}
