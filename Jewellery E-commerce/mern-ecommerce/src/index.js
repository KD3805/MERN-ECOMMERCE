import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { Helmet } from 'react-helmet'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Helmet>
            <title>Gayatri Fashion Jewelry</title>
            <meta name='description' content='Discover a dazzling online jewelry shopping experience with gayatri 💎✨' />
            <meta name="keywords" content="Exquisite Jewelry, Online Store, Luxury Accessories, Secure Transactions, Immersive Design" /> 
        </Helmet>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
