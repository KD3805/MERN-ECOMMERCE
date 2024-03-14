import { ADD_RATING_TO_PRODUCT_FAILURE, ADD_RATING_TO_PRODUCT_REQUEST, ADD_RATING_TO_PRODUCT_SUCCESS, GET_RATING_FAILURE, GET_RATING_REQUEST, GET_RATING_SUCCESSS } from "./ActionType"

const initialState = {
    rating: null,
    ratings: [],
    loading: false,
    error: null
}

export const ratingReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_RATING_TO_PRODUCT_REQUEST:
            return {
                ...state, 
                loading: true,
                error: null
            }
        case ADD_RATING_TO_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                rating: action.payload,
            }
        case ADD_RATING_TO_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_RATING_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
            }
        case GET_RATING_SUCCESSS:
            return {
                ...state,
                ratings: action.payload.ratings,
                // rating: action.payload,
                loading: false,
            }
        case GET_RATING_FAILURE: 
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
        default:
            return state;
    }
}