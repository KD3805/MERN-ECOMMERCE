import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage/HomePage'
import Product from '../components/Products/product'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import Cart from '../components/Cart/Cart'
import Checkout from '../components/Checkout/Checkout'
import OrderHistory from '../components/MyOrders/OrderHistory'
import OrderDetails from '../components/MyOrders/OrderDetails'
import Navigation from '../components/navigation/Navigation'
import Footer from '../components/Footer/footer'

const CustomerRouters = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>

        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<HomePage />}></Route>
        <Route path='/register' element={<HomePage />}></Route>
        <Route path='/:levelOne/:levelTwo/:levelThree' element={<Product />}></Route>
        <Route path='/product/:productId' element={<ProductDetails />}></Route>
        <Route path='/cart' element={<Cart />}></Route> 
        <Route path='/checkout' element={<Checkout />}></Route> 
        <Route path='/account/orders' element={<OrderHistory />}></Route> 
        <Route path='/account/orders/:orderId' element={<OrderDetails />}></Route> 

        {/* <HomePage /> */}
        {/* <Product /> */}
        {/* <ProductDetails /> */}
        {/* <Cart /> */}
        {/* <Checkout /> */}
        {/* <OrderHistory /> */}
        {/* <OrderDetails /> */}
      </Routes>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default CustomerRouters
