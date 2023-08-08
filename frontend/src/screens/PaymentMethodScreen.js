import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
const PaymentMethodScreen = () => {
    let history = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress.address){
        history('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history('/placeorder');
    };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Phương thức thanh toán</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" id="none" value="Thanh toán khi nhận hàng" name="paymentMethod" required onChange={(e) => setPaymentMethod(e.target.value)}></input>
                        <label htmlFor="none">Thanh toán khi nhận hàng</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Tiếp tục</button>
                </div>
            </form>
        </div>
    );
}

export default PaymentMethodScreen;
