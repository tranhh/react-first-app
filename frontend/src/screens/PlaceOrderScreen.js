import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function PlaceOrderScreen(){
    const history = useNavigate();
    const cart = useSelector((state) => state.cart);
    if(!cart.paymentMethod){
        history('/payment');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 1000000 || cart.itemsPrice === 0 ? toPrice(0) : toPrice(0);

    // cart.taxPrice = toPrice(0.1 * cart.itemsPrice);
    cart.taxPrice = 0;

    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () =>{
        dispatch(createOrder({...cart,orderItems: cart.cartItems}));
    }
    useEffect(()=>{
        if(success){
            history(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, history, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Vận chuyển</h2>
                                <p>
                                    <strong>Tên:</strong> {cart.shippingAddress.fullName} <br/>
                                    <strong>Địa chỉ:</strong> {cart.shippingAddress.address},{cart.shippingAddress.city} <br/>
                                    <strong>Số điện thoại:</strong> {cart.shippingAddress.phoneNum} <br/>
                                    <strong>Ghi chú</strong> {cart.shippingAddress.note}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Thanh toán</h2>
                                <p>
                                    <strong>Phương thức: </strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Chi tiết đơn hàng</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((item) =>(
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
                                                        {item.qty} x {item.price}đ = {item.qty * item.price}đ
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body finalVent'>
                        <ul>
                            <li>
                                <h2>Hoá đơn</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Đơn hàng</div>
                                    <div>{cart.itemsPrice}đ</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Vận chuyển</div>
                                    <div>{cart.shippingPrice}đ</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Thuế</div>
                                    <div>{cart.taxPrice}đ</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong className='totalprice'>Tổng tiền</strong></div>
                                    <div><strong className='totalprice'>{cart.totalPrice}đ</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type='button' onClick={placeOrderHandler} className='block' disabled={cart.cartItems.length === 0}>
                                    Đặt hàng
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

