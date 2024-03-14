import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import Product from '../components/Products/product';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import Cart from '../components/Cart/Cart';
import Checkout from '../components/Checkout/Checkout';
import OrderHistory from '../components/MyOrders/OrderHistory';
import OrderDetails from '../components/MyOrders/OrderDetails';
import Navigation from '../components/navigation/Navigation';
import Footer from '../components/Footer/footer';
import Loading from '../../Loading';
import axios from 'axios';
import ModalState from '../../context/modal/modalState';
import RRState from '../../context/rrBox/rrState';


const CustomerRouters = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(function (config) {
      setIsLoading(true);
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(function (response) {
      setIsLoading(false);
      return response;
    }, function (error) {
      setIsLoading(false);
      return Promise.reject(error);
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <ModalState>
      <div>
        <Navigation />
        {isLoading && <Loading />}
      </div>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<HomePage />}></Route>
        <Route path='/register' element={<HomePage />}></Route>
        {/* <Route path='/:levelOne/:levelTwo' element={<Product main={true}/>}></Route> */}
        <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />}></Route>
        <Route path='/product/:productId' element={<RRState><ProductDetails /></RRState>}></Route>
        <Route path='/product/:productId/ratrev' element={<RRState><ProductDetails /></RRState>}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/checkout' element={<Checkout />}></Route>
        <Route path='/account/orders' element={<OrderHistory />}></Route>
        <Route path='/account/orders/:orderId/:index' element={<RRState><OrderDetails /></RRState>}></Route>
        <Route path='/payment/:orderId' element={<HomePage />}></Route>
      </Routes>
      <div>
        <Footer />
      </div>
    </ModalState>
  );
};

export default CustomerRouters;