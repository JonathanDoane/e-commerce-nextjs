'use client'

import Layout from "@/app/components/layout";
import { useEffect, useState } from "react";
import axios from "axios"



export default  function EditProductPage({params}) {

    const {id} = params
    const [products, setProducts] = useState({})

    useEffect(() => {
        axios.get(`/api/products?id=${id}`)
        .then((res) => {setProducts(res.data);console.log(res.data)})
        .catch((err)=> {console.log(err)})
    },[])
    
    
    
    return (
        <Layout>
            <h1>{products.name}</h1>
        </Layout>
    )
}

//have problem with array instead of individual 1:34:05