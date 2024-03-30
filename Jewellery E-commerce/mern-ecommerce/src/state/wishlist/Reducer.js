import { ADD_WISH_ITEM_FAILURE, ADD_WISH_ITEM_REQUEST, ADD_WISH_ITEM_SUCCESS, GET_WISH_FAILURE, GET_WISH_REQUEST, GET_WISH_SUCCESSS, REMOVE_WISH_ITEM_FAILURE, REMOVE_WISH_ITEM_REQUEST, REMOVE_WISH_ITEM_SUCCESSS } from "./ActionType"

const initialState = {
    wishItems: [],
    wish: null,
    loading: false,
    error: null
}

export const wishReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_WISH_ITEM_REQUEST:
        case GET_WISH_REQUEST:
        case REMOVE_WISH_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        
        case ADD_WISH_ITEM_SUCCESS:
            return {
                ...state,
                wishItems: [...state.wishItems, action.payload.wishItems],
                loading: false,
            }
        case GET_WISH_SUCCESSS:
            return {
                ...state,
                wishItems: action.payload.wishItems,
                wish: action.payload,
                loading: false,
            }
        case REMOVE_WISH_ITEM_SUCCESSS:
            return {
                ...state,
                deleteWishItem: action.payload,
                loading: false,
            }
        
        case ADD_WISH_ITEM_FAILURE:
        case GET_WISH_FAILURE:
        case REMOVE_WISH_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        
        default:
            return state;
    }
}