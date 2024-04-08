import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import "./Product.css"
interface ProductProps {
    product: {
        _id: string;
        name: string;
        images: { url: string }[];
        price: number;
        category: string;
        rating: number;
        description: string;
        // Add more properties as needed
    };
}
// const options = ["Cloth", "Electronics", "Food", "Books"];

const options={ edit: false, color: "rgba(20,20,20,0.1)", activeColor: "tomato", size: window.innerWidth < 600 ? 20 : 25, value: .5, isHalf: true}
const Product: React.FC<ProductProps> = ({ product }) => {
    // console.log(product);
    return (
        <Link className="productCard" to={product._id}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} /><span>(dnwodwdnw)</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    );
};

export default Product;
