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
                <input type="file" name="file" onChange={handleFileChange} />


                <button type="submit" className="btn-primary">Add Product</button>
            </form>
        </Layout>
    )
}

