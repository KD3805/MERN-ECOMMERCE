import {
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    GET_ALL_USERS_FAILURE,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
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
    users: [],
    isLoading: false,
    error: null,
    jwt: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGESTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GET_ALL_USERS_REQUEST:
        case DELETE_USER_REQUEST:
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

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deletedUserId: action.payload,
            }
        
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload,
                error: null
            }
        
        case REGESTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:  
        case GET_ALL_USERS_FAILURE:  
        case DELETE_USER_FAILURE:  
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
