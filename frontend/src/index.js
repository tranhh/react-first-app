import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  {/* <React.StrictMode> */}
  <BrowserRouter>
    <App />
  </BrowserRouter>
  {/* </React.StrictMode> */}
  </Provider>
);




reportWebVitals();
