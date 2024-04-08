import React from 'react'
// import {CgMouse} from "@react-icons/all-files"
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "../../product/Product"
import MetaData from '../MetaData';
const Home = () => {
    const products={
        "name": "Radom",
        "price": 400,
        "description": "dfsda",
        "category": "Cloth",
        "rating": 55,
        "_id":"__1234",
        "images": [{url : "https://source.unsplash.com/random"}]
    }
    // _id: string;
    // name: string;
    // images: { url: string }[];
    // price: number;
    // category: string;
    // rating: number;
  return (
    <>
    <MetaData title="E-commerce" />
    <div className="banner">
        <p>Welcome to `E-commerce`</p>

        <h1>FIND AMAZING PRODUCT</h1>
        <a href='#container'>
            <button>Scroll <CgMouse /></button>
        </a>
    </div>
    <h1 className='homeHeading'>Featured Products</h1>
    <div className="container" id="container">
        <Product product={products}/>
        <Product product={products}/>
        <Product product={products}/>
        <Product product={products}/>
        <Product product={products}/>
        <Product product={products}/>
        <Product product={products}/>
        <Product product={products}/>
    </div>
    </>
  )

}

export default Home