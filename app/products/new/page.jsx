'use client'
import { useState } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NewProduct() {

    const [state, setState] = useState({
        name: '',
        description: '',
        price: '',
        file: null
    })
    

    const router = useRouter();

    const inputHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value })
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        console.log('File:', file);
        const buffer = await file.arrayBuffer();
        const bufferString = Buffer.from(buffer).toString('base64');
        console.log('Buffer:', buffer);
        setState({
            ...state,
            file: bufferString
        });
    }

    function CreateProduct(e){
        e.preventDefault()
        console.log(state)
        
        axios.post('/api/products',state, {headers: {'Content-Type': state.file.type}})
        .then((res)=> {console.log('Success:', res); 
        router.push('/products')})
        .catch((err)=> {console.log(err)})
        
    }
    const data = state.file



    return(
        <Layout>
            <h1>New Product</h1>
            <form onSubmit={CreateProduct} className="flex flex-col" encType="multipart/form-data">
                <label htmlFor="name">Product Name</label>
                <input type="text" placeholder="Product Name" name="name" value={state.name} onChange={inputHandler}/>

                <label htmlFor="description">Description</label>
                <textarea placeholder="Description" name="description" value={state.description} onChange={inputHandler}></textarea>

                <label htmlFor="price">Price (in USD) </label>
                <input type="number" placeholder="Price" name="price" value={state.price} onChange={inputHandler}/>

                <label htmlFor="file">Photos </label>
                <div className="flex justify-between w-1/5">
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


                <button type="submit" className="btn-primary">Add Product</button>
            </form>
        </Layout>
    )
}

