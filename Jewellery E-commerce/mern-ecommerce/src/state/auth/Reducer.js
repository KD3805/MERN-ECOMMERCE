import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGESTER_FAILURE,
    REGESTER_REQUEST,
    REGESTER_SUCCESS,
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGESTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case REGESTER_SUCCESS: 
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jwt: action.payload,
                error: null
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null
            };
        
        case REGESTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:  
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        case LOGOUT:
            return { ...initialState };

        default:
            return state;
    }
};
