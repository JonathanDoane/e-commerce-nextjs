'use client'
import Layout from "../components/layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Categories() {

    const [state, setState] = useState({category: ''})
    const [categories, setCategories] = useState([])
    
    function saveCategory(e) {
        e.preventDefault();
        
        axios.post('/api/categories', state) //left off adding category to the database 3:16:16
        .then((res)=> {console.log('Success:', res)})
        .catch((err)=> {console.log(err)})
    }
    
    const inputHandler = (e) => {
        setState({...state, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get('/api/categories')
        .then((res) => {
            setCategories(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <Layout>
            <h1>Categories</h1>
            <form onSubmit={saveCategory}>
            <label htmlFor="category">New Category Name</label>
                <div className="flex gap-1">
                    <input name="category" type="text" placeholder="Insert category" className="mb-0" value = {state.category} onChange={inputHandler}/>
                    <button className="btn-primary" type="submit">Add</button>
                </div>
            </form>
            <h2>Categories: </h2>
            {
                categories?.map((category, idx) => (
                    
                    <div key={idx}>
                        <h2>{category.category}</h2>
                    </div>
                ))
            }

        </Layout>
    )
}