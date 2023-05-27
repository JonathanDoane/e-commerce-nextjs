'use client'
import { useState } from "react";
import Layout from "../../components/layout";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NewProduct() {

    const [state, setState] = useState({
        name: '',
        description: '',
        price: ''
    })
    const [error, setError] = useState ([])

    const router = useRouter();
    const inputHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value })
    }

    function CreateProduct(e){
        e.preventDefault()
        
        axios.post('/api/products', state)
        .then((res)=> {console.log(res.data);router.push('/products')})
        .catch((err)=> {console.log(err)})
        

    }

    return(
        <Layout>
            <h1>New Product</h1>
            <form onSubmit={CreateProduct} className="flex flex-col">
                <label htmlFor="name">Product Name</label>
                <input type="text" placeholder="Product Name" name="name" value={state.name} onChange={inputHandler}/>

                <label htmlFor="description">Description</label>
                <textarea placeholder="Description" name="description" value={state.description} onChange={inputHandler}></textarea>

                <label htmlFor="price">Price (in USD) </label>
                <input type="number" placeholder="Price" name="price" value={state.price} onChange={inputHandler}/>

                <button type="submit" className="btn-primary">Add Product</button>
            </form>
        </Layout>
    )
}

