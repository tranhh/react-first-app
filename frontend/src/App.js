import React from 'react';
import { Link, Route, Routes, useNavigate} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';

function App() {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const history = useNavigate();

    const signoutHandler = () =>{
        dispatch(signout());
        history('/signin');
    }

  return (
      <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/"><img src="../images/logo1.png" alt="" width={150}/></Link>
        </div>
        <div className="header-links">
          <Link to="/cart">GIỎ HÀNG
            {cartItems.length >0 && (
                <span className="badge">{cartItems.length}</span>
            )}
          </Link>
            {
                userInfo ? (
                    <div className="dropdown">
                        <Link to="/profile" className='username'>{userInfo.name} <i className=" fa fa-caret-down"></i></Link>
                        <ul className="dropdown-content">
                            <Link to="/orderhistory" className="orderhistory">Lịch sử</Link>
                            <div className="signout" onClick={signoutHandler}>Đăng xuất</div>
                        </ul>
                    </div>
                ) : (
                    <Link to="/signin">Đăng nhập Test</Link>
                )
            }
        </div>
      </header>
      {/* <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <ul>
          <li>
            <a href="index.html">Pants</a>
          </li>

          <li>
            <a href="index.html">Shirts</a>
          </li>

        </ul>
      </aside> */}
      <main>
        <Routes>
            <Route path="/cart/:id?" element={<CartScreen/>}></Route>
            <Route path="/product/:id" element={<ProductScreen/>}></Route>
            <Route path="/signin" element={<SigninScreen/>} ></Route>
            <Route path="/register" element={<RegisterScreen/>} ></Route>
            <Route path="/shipping" element={<ShippingAddressScreen/>} ></Route>
            <Route path="/payment" element={<PaymentMethodScreen/>} ></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen/>} ></Route>
            <Route path="/order/:id" element={<OrderScreen/>} ></Route>
            <Route path="/orderhistory" element={<OrderHistoryScreen/>} ></Route>
            <Route path="/profile" element={<ProfileScreen/>} ></Route>

            {/* <PrivateRoute
            path="/profile"
            component={ProfileScreen}
            ></PrivateRoute> */}
            <Route path="/" element ={<HomeScreen/>} exact></Route>
        </Routes>
    </main>
      <footer className="footer">
      <div className="container">
            <div className="main-footer d-flex">
                <div className="left-footer">
                    <div className="top-left">
                        <div className="logo-footer">
                            <a href="/">
                                <img src="../images/logo1.png" alt="" width={150}/>
                            </a>
                        </div>
                        <div className="logo-conthuong">
                            <a href="/">
                                <img src="../images/img-congthuong.png" alt="img-congthuong" />
                            </a>
                        </div>
                    </div>
                    <div className="content-left-ft content-ft">
                        <div className="info-left-ft">
                            <p>Công ty Cổ phần gì gì đó</p>
                            <p><strong>Địa chỉ đăng ký: </strong>Tổ dân phố Đố Tìm Được, Q.Hà Đông, Hà Nội, Việt Nam</p>						<p><strong>Số điện thoại: </strong>01234556789</p>						<p><strong>Email: </strong> tranhnguyen8a1@gmail.com</p>					</div>
                        <ul className="list-social">
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=100074948054820" >
                                    <img src="../images/ic_fb.svg" alt="ic_fb"/>
                                </a>
                            </li>
                            <li>
                                <a href="/" >
                                    <img src="../images/ic_gg.svg" alt="ic_instagram"/>
                                </a>
                            </li>
                            <li>
                                <a href="/" target="_blank">
                                    <img src="../images/ic_instagram.svg" alt="ic_pinterest"/>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/" >
                                    <img src="../images/ic_ytb.svg" alt="ic_ytb"/>
                                </a>
                            </li>
                        </ul>
                        <div className="hotline">
                            <a href="/">Hotline: 012345678</a>
                        </div>
                    </div>
                </div>
                <div className="center-footer d-flex">
                    <div className="left-center-ft item-center-ft">
                        <p className="title-footer">Giới thiệu</p>
                        <ul>
                            <li>
                                <a href="/">Về IVY moda</a>
                            </li>
                            <li>
                                <a href="/">Tuyển dụng</a>
                            </li>
                            <li>
                                <a href="/">Hệ thống cửa hàng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="main-center-ft item-center-ft">
                        <p className="title-footer">Dịch vụ khách hàng</p>
                        <ul>
                            <li>
                                <a href="/">Chính sách điều khoản</a>
                            </li>
                            <li>
                                <a href="/">Hướng dẫn mua hàng</a>
                            </li>
                            <li>
                                <a href="/">Chính sách thanh toán</a>
                            </li>
                            <li>
                                <a href="/">Chính sách đổi trả</a>
                            </li>
                            <li>
                                <a href="/">Chính sách bảo hành</a>
                            </li>
                            <li>
                                <a href="/">Chính sách giao nhận vận chuyển</a>
                            </li>
                            <li>
                                <a href="/">Chính sách thẻ thành viên</a>
                            </li>
                            <li>
                                <a href="/">Hệ thống cửa hàng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="right-center-ft item-center-ft">
                        <p className="title-footer">Liên hệ</p>
                        <ul>
                            <li>
                                <a href="/">Hotline</a>
                            </li>
                            <li>
                                <a href="/">Email</a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=100074948054820">Live Chat</a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=100074948054820" >Messenger</a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/profile.php?id=100074948054820">Liên hệ</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="right-footer">
                    <div className="register-form">
                        <p className="title-footer">Nhận thông tin các chương trình của IVY moda</p>
                        <form id="frm_subscribe">
                            <input id="email_subscribe" type="text" name="email" placeholder="Nhập địa chỉ email" required="required"/>
                            <div className="btn-submit">
                                <input id="btn-submit" className="form-submit" value="Đăng ký" type="submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </footer>
    </div>

  );
}

export default App;