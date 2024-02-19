import { Route, Routes } from 'react-router-dom';
import Cart from './customer/components/Cart/Cart';
import Checkout from './customer/components/Checkout/Checkout';
import Footer from './customer/components/Footer/footer';
import OrderDetails from './customer/components/MyOrders/OrderDetails';
import OrderHistory from './customer/components/MyOrders/OrderHistory';
import ProductCard from './customer/components/ProductDetails/ProductCard ';
import ProductDetails from './customer/components/ProductDetails/ProductDetails';
import Product from './customer/components/Products/product';
import PrimarySearchAppBar from './customer/components/navigation/AppBar';
import Navigation from './customer/components/navigation/Navigation';
import HomePage from './customer/pages/HomePage/HomePage';
import CustomerRouters from './customer/routers/CustomerRouters';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<CustomerRouters />}></Route>
      </Routes>
    </div>
  );
}

export default App;
