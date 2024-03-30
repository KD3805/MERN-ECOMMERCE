import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, PLACED_ORDER_FAILURE, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"

const initialState = {
    loading: false,
    orders: [],
    error: "",
}

export const adminOrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDERS_REQUEST:
        case CONFIRMED_ORDER_REQUEST:
        case CANCEL_ORDER_REQUEST:
        case SHIP_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        // case PLACED_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        
        case GET_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                error: "",
            }

        case GET_ORDERS_FAILURE:
            return {
                loading: false,
                orders: [],
                error: action.payload,
            }

        case CONFIRMED_ORDER_SUCCESS:
            return {
                ...state,
                confirmed: action.payload,
                loading: false,
            }

        case SHIP_ORDER_SUCCESS:
            return {
                ...state,
                shipped: action.payload,
                loading: false,
            }
        
        // case PLACED_ORDER_SUCCESS:
        //     return {
        //         ...state,
        //         placed: action.payload,
        //         loading: false,
        //     }
        
        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                delivered: action.payload,
                loading: false,
            }   

        case CANCEL_ORDER_SUCCESS:
            return {
                ...state,
                canceled: action.payload,
                loading: false,
            }
        
        case CONFIRMED_ORDER_FAILURE:
        case CANCEL_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case SHIP_ORDER_FAILURE:
        // case PLACED_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        
        case DELETE_ORDER_REQUEST:
            return {
                ...state, loading: true,
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state, 
                loading: false, 
                deletedOrder: action.payload,
            }
        case DELETE_ORDER_FAILURE:
            return {
                ...state, 
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
        
    }
}