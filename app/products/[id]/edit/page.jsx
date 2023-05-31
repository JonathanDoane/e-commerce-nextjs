'use client'
import Layout from "@/app/components/layout";
import { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";
import { useRouter } from "next/navigation";

    export default  function EditProductPage({params}) {

        const {id} = params
        const [products, setProducts] = useState({ name: '', description: '', price: ''})
        //console.log(id)

        useEffect(() => {
            axios.get(`/api/products?id=${id}`)
            .then((res) => {setProducts(res.data);console.log(res.data)})
            .catch((err)=> {console.log(err)})
        },[])

        const inputHandler = (e) => {
            setProducts({...products, [e.target.name]: e.target.value })
        }
        const router = useRouter();

        function UpdateProduct(e){
            e.preventDefault()
            
            axios.put(`/api/products?id=${id}`, products)
            .then((res)=> {console.log(res.data);router.push('/products')})
            .catch((err)=> {console.log(err)})
            
    
        }


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

                <button type="submit" className="btn-primary">Update Product</button>
            </form>
            
        </Layout>
    )
}
 