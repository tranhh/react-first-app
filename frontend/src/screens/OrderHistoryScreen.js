import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions'

export default function OrderHistoryScreen(){
    const orderMineList = useSelector(state => state.orderMineList);
    const { loading, error, orders } = orderMineList;
    const history = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listOrderMine());
    }, [dispatch]);
    return (
        <div>
            <h1>Lịch sử giao dịch</h1>
            {loading? <LoadingBox></LoadingBox>
            : error? <MessageBox variant="danger">{error}</MessageBox>
            : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NGÀY</th>
                            <th>TỔNG</th>
                            <th>THANH TOÁN</th>
                            <th>VẬN CHUYỂN</th>
                            <th>CHI TIẾT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) =>(
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid? order.paidAt.substring(0, 10): 'Chưa'}</td>
                                <td>{order.isDelivered? order.deliveredAt.substring(0, 10): 'Chưa'}</td>
                                <td>
                                    <button type='button' className='small' onClick={()=> {history(`/order/${order._id}`)}}>Chi tiết</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    );
}

