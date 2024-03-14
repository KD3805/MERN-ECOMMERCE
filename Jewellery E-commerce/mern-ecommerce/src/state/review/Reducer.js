import { ADD_REVIEW_TO_PRODUCT_FAILURE, ADD_REVIEW_TO_PRODUCT_REQUEST, ADD_REVIEW_TO_PRODUCT_SUCCESS, GET_REVIEW_FAILURE, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESSS } from "./ActionType";

const initialState = {
    review: null,
    reviews: [],
    loading: false,
    error: null
};

export const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_REVIEW_TO_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case ADD_REVIEW_TO_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                review: action.payload, 
            }
        case ADD_REVIEW_TO_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        case GET_REVIEW_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
            }
        case GET_REVIEW_SUCCESSS:
            return {
                ...state,
                reviews: action.payload.reviews,
                // product: action.payload,
                loading: false,
            }
        case GET_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}