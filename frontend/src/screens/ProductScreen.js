import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Rating from '../components/Rating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/productActions';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ProductScreen() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const productId = id;
    const [qty,setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product} = productDetails;
    const history = useNavigate();
    useEffect(() =>{
        dispatch(detailsProduct(productId));
    }, [dispatch,productId] );
    const addToCartHandler = () =>{
        history(`/cart/${productId}?qty=${qty}`);
    };
    return (
        <div>
        {loading ? ( 
         <LoadingBox></LoadingBox>
        ) : error ? ( 
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div>
            <div className="back"><Link to="/">Quay lại</Link></div>
            <div className="row details">
                <div className="details-image">
                    <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating 
                                rating={product.rating}
                                numReviews={product.numReviews}
                            ></Rating>
                        </li>
                        <li>Mô tả:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>

                <div className="details-action"> 
                    <div>
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">{product.price}đ</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Trạng thái</div>
                                    <div>
                                        {product.countInStock>0?( <span className="success">Còn hàng</span>
                                        ) : (
                                        <span className="error">Không có sẵn</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                            {
                                product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className="row">
                                                <div>SL</div>
                                                <div>
                                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map( (x) => (
                                                                <option key={x + 1} value={x + 1} > {x + 1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick={addToCartHandler} className="primary block">Thêm vào giỏ hàng</button>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            
            </div>
        </div>
            )}
        </div>


        
        );
}
