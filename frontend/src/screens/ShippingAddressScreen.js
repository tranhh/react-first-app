import React, { useState } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import { useNavigate } from 'react-router-dom';

export default function ShippingAddressScreen(){
    const history = useNavigate();

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo){
        history('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [phoneNum, setPhoneNum] = useState(shippingAddress.phoneNum);
    const [note, setNote] = useState(shippingAddress.note);
    const dispatch = useDispatch();

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, phoneNum, note}));
        history('/payment');
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Thông tin vận chuyển</h1>
                </div>
                <div>
                    <label htmlFor="fullName"></label>
                    <input type="text" id="fullName" placeholder="Họ tên" value={fullName} onChange={(e)=> setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city"></label>
                    <input type="text" id="city" placeholder="Tỉnh/Thành phố" value={city} onChange={(e)=> setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address"></label>
                    <input type="text" id="address" placeholder="Địa chỉ" value={address} onChange={(e)=> setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="phoneNum"></label>
                    <input type="tel" id="phoneNum" placeholder="Số điện thoại" value={phoneNum} onChange={(e)=> setPhoneNum(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="note"></label>
                    <input type="text" id="note" placeholder="Ghi chú" value={note} onChange={(e)=> setNote(e.target.value)} ></input>
                </div>
                <div>
                    <label/>
                    <button className="primary2" type="submit">Xác nhận</button>
                </div>
            </form>
        </div>
    );
}

