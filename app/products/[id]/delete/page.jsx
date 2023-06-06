'use client'
import Layout from "@/app/components/layout";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DeleteProduct({params}) {

    const router = useRouter()
    function goBack() {
        router.push('/products')
    }

    const {id} = params
    const [products, setProducts] = useState()
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get(`/api/products?id=${id}`)
        .then((res)=> {setProducts(res.data)})
        .catch((err)=>{console.log(err)})
    },[])

     async function deleteProduct() {
        await axios.delete(`/api/products?id=${id}`);
        goBack()
    }

    return (
        <Layout>
                <h1 className="w-full text-center mt-10">Do you really want to <span className="text-red-700 font-bold">DELETE</span> {products?.name}?</h1>
                <div className="flex gap-2 justify-center mt-7">
                    <button className="btn-primary-del" onClick={deleteProduct}>YES</button>
                    <button onClick={goBack} className="btn-primary">NO</button>
                </div>
        </Layout>
    )
}