'use client'

import Layout from "@/app/components/layout";
import { useEffect, useState } from "react";
import axios from "axios"
import Link from "next/link";



export default  function ViewProductPage({params}) {

    const {id} = params
    const [products, setProducts] = useState({})

    useEffect(() => {
        axios.get(`/api/products?id=${id}`)
        .then((res) => {setProducts(res.data);console.log(res.data)})
        .catch((err)=> {console.log(err)})
    },[])
    
    
    
    return (
        <Layout>
                <div className="flex w-2/6 m-auto">
                <h1 className=" bg-blue-900 rounded-lg w-1/2 m-auto mt-5 text-center text-white pb-3 p-2 text-5xl">{products.name} Details</h1>
                <Link href = {`/products/`} className="simple"> Go Back </Link>
                </div>
           
            
            <div className="bg-blue-900 rounded-lg text-white text-center text-2xl w-1/3 m-auto mt-8 h-1/4">
                <h2 className="mb-5">Price: {products.price}</h2>
                <h2>Description: {products.description}</h2>
            </div>
            
        </Layout>
    )
}

