import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './auth/Reducer';
import { customerProductReducer } from './product/Reducer';
import { cartReducer } from './cart/Reducer';
import { orderReducer } from './order/Reducer';
import { reviewReducer } from './review/Reducer';
import { ratingReducer } from './rating/Reducer';
import { adminOrderReducer } from './admin/order/Reducer';
import { wishReducer } from './wishlist/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    products: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer,
    rating: ratingReducer,
    adminOrder: adminOrderReducer,
    wishlist: wishReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));