import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
export default function CartScreen(){
    let {id} = useParams();
    const productId = id;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const qty = searchParams? searchParams.get('qty') : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const history = useNavigate();
    
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    }, [dispatch, productId,qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () =>{
        if(userInfo)    history('/shipping');
        else    history('/signin');
    }
    
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Giỏ hàng</h1>
                { cartItems.length === 0?(<MessageBox>Giỏ hàng trống. <Link to="/">Quay lại</Link> </MessageBox>)
                : (
                    <ul>
                        {
                            cartItems.map((item) =>(
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img 
                                                src = {item.image}
                                                alt = {item.name}
                                                className="small"
                                            ></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div>
                                            <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                    [...Array(item.countInStock).keys()].map( (x) => (
                                                        <option key={x + 1} value={x + 1} > {x + 1}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            {item.price}đ
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => removeFromCartHandler(item.product)}>Xoá</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li className='butt'>
                            <h2>
                                Tổng thanh toán gfd. ({cartItems.reduce((a,c) => a + c.qty * 1, 0)} items): {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}đ
                            </h2>
                        </li>
                        <li className='butt'>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length === 0}>
                                Đặt Hàng
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

