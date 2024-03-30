import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESSS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESSS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESSS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESSS } from "./ActionType";
import { produce } from "immer";

const initialState = {
    cart: null,
    loading: false,
    error: null,
    cartItems: []
};

export const cartReducer = (state = initialState, action) => {
    return produce(state, (draftState) => {
        switch (action.type) {
            case ADD_ITEM_TO_CART_REQUEST:
                draftState.loading = true;
                draftState.error = null;
                break;

            case ADD_ITEM_TO_CART_SUCCESSS:
                draftState.cartItems.push(...action.payload.cartItems);
                draftState.loading = false;
                break;

            case ADD_ITEM_TO_CART_FAILURE:
                draftState.loading = false;
                draftState.error = action.payload;
                break;

            case GET_CART_REQUEST:
                draftState.loading = true;
                draftState.error = null;
                break;

            case GET_CART_SUCCESSS:
                draftState.cartItems = action.payload.cartItems;
                draftState.cart = action.payload;
                draftState.loading = false;
                break;

            case GET_CART_FAILURE:
                draftState.loading = false;
                draftState.error = action.payload;
                break;

            case REMOVE_CART_ITEM_REQUEST:
            case UPDATE_CART_ITEM_REQUEST:
                draftState.loading = true;
                draftState.error = null;
                break;

            case REMOVE_CART_ITEM_SUCCESSS:
                draftState.deleteCartItem = action.payload;
                draftState.loading = false;
                break;

            case UPDATE_CART_ITEM_SUCCESSS:
                draftState.updateCartItem = action.payload;
                draftState.loading = false;
                break;

            case REMOVE_CART_ITEM_FAILURE:
            case UPDATE_CART_ITEM_FAILURE:
                draftState.loading = false;
                draftState.error = action.payload;
                break;

            default:
                // No changes needed for default case
                break;
        }
    });
};




// CartReducer.js : 

// export const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case ADD_ITEM_TO_CART_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             }
//         case ADD_ITEM_TO_CART_SUCCESSS:
//             return {
//                 ...state,
//                 cartItems: [...state.cartItems, action.payload.cartItems],
//                 loading: false,
//             }
//         case ADD_ITEM_TO_CART_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload
//             }

//         case GET_CART_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             }
//         case GET_CART_SUCCESSS:
//             return {
//                 ...state,
//                 cartItems: action.payload.cartItems,
//                 cart: action.payload,
//                 loading: false,
//             }
//         case GET_CART_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload
//             }

//         case REMOVE_CART_ITEM_REQUEST:
//         case UPDATE_CART_ITEM_REQUEST:
//             return {
//                 ...state,
//                 loading: true,
//                 error: null,
//             }
//         case REMOVE_CART_ITEM_SUCCESSS:
//             return {
//                 ...state,
//                 deleteCartItem: action.payload,
//                 loading: false,
//             }
//         case UPDATE_CART_ITEM_SUCCESSS:
//             return {
//                 ...state,
//                 updateCartItem: action.payload,
//                 loading: false,
//             }
//         case REMOVE_CART_ITEM_FAILURE:
//         case UPDATE_CART_ITEM_FAILURE:
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload,
//             }

//         default:
//             return state;

//     }
// }