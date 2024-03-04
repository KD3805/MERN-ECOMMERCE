import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { thunk, withExtraArgument } from 'redux-thunk';
import { authReducer } from './auth/Reducer';
import { customerProductReducer } from './product/Reducer';
import { cartReducer } from './cart/Reducer';
import { orderReducer } from './order/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    products: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
})

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));