import React from 'react';

export default function CheckoutSteps(props){
    return (
        <div className="row checkout-steps">
            <ul>
                <li className={props.step1 ? 'active': ''}>Đăng nhập</li>
                <li className={props.step2 ? 'active': ''}>Đặt hàng</li>
                <li className={props.step3 ? 'active': ''}>Thanh toán</li>
                <li className={props.step4 ? 'active': ''}>Hoàn thành đơn</li>

            </ul>
            {/* <div className={props.step1 ? 'active': ''}>Đăng nhập</div>
            <div className={props.step2 ? 'active': ''}>Đặt hàng</div>
            <div className={props.step3 ? 'active': ''}>Thanh toán</div>
            <div className={props.step4 ? 'active': ''}>Hoàn thành đơn</div> */}

        </div>
    );
}

