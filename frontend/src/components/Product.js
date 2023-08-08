import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';

export default function Product(props){
    const{product} = props;

    return (
        <div key={product._id} className="product">
        <Link to={`/product/${product._id}`}>
          <img className="product-image" src={product.image} alt={product.name} />
        </Link>
        <div className="product-name at">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
          <Rating 
              rating={product.rating} 
              numReviews ={product.numReviews}
          ></Rating>
        </div>
        <div className="product-brand at">{product.brand}</div>
        <div className="product-price at">{product.price}đ</div>
      </div>
    );
}

