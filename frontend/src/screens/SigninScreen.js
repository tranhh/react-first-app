import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../actions/userActions';
import { useSearchParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen(){
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = searchParams? searchParams.get('redirect') : '/';
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const history = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
        history('/');
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
                    <h1>Đăng Nhập</h1>
                </div>
                {
                    loading && <LoadingBox></LoadingBox>
                }
                {
                    error && <MessageBox variant="danger">{error}</MessageBox>
                }
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
                    <label/>
                    <button className="signin" type="submit">Đăng Nhập</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Chưa có tài khoản? <Link to={`/register`}>Đăng ký</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
