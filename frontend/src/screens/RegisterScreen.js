import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import { useSearchParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(){
    const [searchParams] = useSearchParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const redirect = searchParams? searchParams.get('redirect') : '/';
    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    const history = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Mật khẩu và mật khẩu xác nhận không khớp!');
        }
        else{
            dispatch(register(name, email, password));
        }
    };
    useEffect(() =>{
        if(userInfo){
            history(redirect);
        }
    }, [history, redirect, userInfo])
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Tạo tài khoản</h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant="danger">{error}</MessageBox>
                }
                <div>
                    <label htmlFor="name">Tên</label>
                    <input
                    type="text"
                    id="name"
                    placeholder="Enter name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="Password">Mật khẩu</label>
                    <input
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="confirmPassword"> Xác nhận mật khẩu</label>
                    <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Enter confirm Password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="signin" type="submit">Đăng Ký</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Đã có tài khoản? <Link to={`/signin?redirect=${redirect}`}>Đăng Nhập</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

