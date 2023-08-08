import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsOrder, payOrder } from '../actions/orderActions';
import Axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstants';


export default function OrderScreen(){
    let { id } = useParams();
    const orderId = id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error} = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const{loading: loadingPay, error: errorPay, success: successPay} = orderPay;
    const dispatch = useDispatch();

    useEffect(()=>{
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script =  document.createElement('script');
            script.type ="text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if(!order || successPay || (order && order._id !== orderId)){
            dispatch({ type: ORDER_PAY_RESET});
            dispatch(detailsOrder(orderId));
        } else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript();
                }
                else{
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay]);

    const successPaymentHandler = (paymentResult) =>{
        dispatch(payOrder(order, paymentResult))
    };


    return loading? (
        <LoadingBox></LoadingBox>
    ) : error? (
        <MessageBox variant="danger">{error}</MessageBox>)
    : (
        <div>
            <h1> Đơn hàng ID: {order._id} </h1>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Vận chuyển</h2>
                                <p>
                                    <strong>Tên:</strong> {order.shippingAddress.fullName} <br/>
                                    <strong>Địa chỉ:</strong> {order.shippingAddress.address},{order.shippingAddress.city} <br/>
                                    <strong>Số điện thoại:</strong> {order.shippingAddress.phoneNum} <br/>
                                    <strong>Ghi chú</strong> {order.shippingAddress.note}
                                </p>
                                {order.isDelivered? (
                                <MessageBox variant="success">Đơn hàng đã được chuyển đi vào {order.deliveredAt}</MessageBox>
                                ) : (
                                <MessageBox variant="danger">Chưa được chuyển đi</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Thanh toán</h2>
                                <p>
                                    <strong>Phương thức:</strong>{order.paymentMethod}
                                </p>
                                {order.isPaid? (
                                <MessageBox variant="success">Đã được thanh toán {order.paidAt}</MessageBox>
                                ) : (
                                <MessageBox variant="danger">Chưa được thanh toán</MessageBox>
                                )}
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Chi tiết đơn hàng</h2>
                                <ul>
                                    {
                                        order.orderItems.map((item) =>(
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
                                    <div>{order.itemsPrice}đ</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Vận chuyển</div>
                                    <div>{order.shippingPrice}đ</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Thuế</div>
                                    <div>{order.taxPrice}đ</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div><strong className='totalprice'>Tổng tiền</strong></div>
                                    <div><strong className='totalprice'>{order.totalPrice}đ</strong></div>
                                </div>
                            </li>
                            {!order.isPaid && (
                                <li>
                                    {!sdkReady? ( <LoadingBox></LoadingBox>
                                    ) : (
                                        <>
                                            {errorPay && (
                                                <MessageBox variant="danger">{errorPay}</MessageBox>
                                            )}
                                            {loadingPay && <LoadingBox></LoadingBox>}

                                            <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            ></PayPalButton>
                                        </>
                                    )}
                                </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

