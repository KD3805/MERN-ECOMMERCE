import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Product from "../components/Products/product";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import OrderHistory from "../components/MyOrders/OrderHistory";
import OrderDetails from "../components/MyOrders/OrderDetails";
import Navigation from "../components/navigation/Navigation";
import ModalState from "../../context/modal/modalState";
import RRState from "../../context/rrBox/rrState";
import PageNotFound from "../components/NotFound/PageNotFound";
import { store } from "../../state/store";
import UserDetails from "../components/User_Details/UserDetails";
import Footer from "../components/Footer/Footer";

// Define a higher-order component to conditionally render Navigation and Footer
const WithLayout = ({ children, showLayout }) => {

  return showLayout ? (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  ) : (
    children
  );
};

const CustomerRouters = () => {
  const [authenticated, setAuthenticated] = useState(true); // You need to implement this

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("jwt") !== null; // Example: Check if token exists in localStorage
    setAuthenticated(isAuthenticated);
  }, []);


  return (
    <ModalState>
      <Routes>
        <Route
          path="/"
          element={
            <WithLayout showLayout={true}>
              <HomePage />
            </WithLayout>
          }
        />
        <Route
          path="/login"
          element={
            <WithLayout showLayout={true}>
              <HomePage />
            </WithLayout>
          }
        />
        <Route
          path="/register"
          element={
            <WithLayout showLayout={true}>
              <HomePage />
            </WithLayout>
          }
        />

        <Route
          path="/product/:productId"
          element={
            <WithLayout showLayout={true}>
              <RRState>
                <ProductDetails />
              </RRState>
            </WithLayout>
          }
        />
        <Route
          path="/product/:productId/ratrev"
          element={
            authenticated ? (
              <WithLayout showLayout={true}>
                <RRState>
                  <ProductDetails />
                </RRState>
              </WithLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/:levelOne/:levelTwo/:levelThree"
          element={
            <WithLayout showLayout={true}>
              <Product />
            </WithLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <WithLayout showLayout={true}>
              <Cart />
            </WithLayout>
          }
        />

        <Route
          path="/user-details"
          element={
            authenticated ? (
              <WithLayout showLayout={true}>
                <UserDetails />
              </WithLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/checkout"
          element={
            authenticated ? (
              <WithLayout showLayout={true}>
                <Checkout />
              </WithLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/account/orders/:orderId/:index"
          element={
            authenticated ? (
              <WithLayout showLayout={true}>
                <RRState>
                  <OrderDetails />
                </RRState>
              </WithLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/payment/:orderId"
          element={<WithLayout showLayout={true}><OrderHistory /></WithLayout>}
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <WithLayout showLayout={true}>
              <PageNotFound />
            </WithLayout>
          }
        />
      </Routes>
    </ModalState>
  );
};

export default CustomerRouters;
