import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk, withExtraArgument } from 'redux-thunk';
import { authReducer } from './auth/Reducer';
import { customerProductReducer } from './product/Reducer';
import { cartReducer } from './cart/Reducer';
import { orderReducer } from './order/Reducer';
import { reviewReducer } from './review/Reducer';
import { ratingReducer } from './rating/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    products: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer,
    rating: ratingReducer
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));