import axios from 'axios';
import { API_BASE_URL, api } from '../../config/apiConfig';
import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGESTER_FAILURE, REGESTER_REQUEST, REGESTER_SUCCESS } from './ActionType';


const registerRequest = () => ({type: REGESTER_REQUEST});
const registerSuccess = (user) => ({type: REGESTER_SUCCESS, payload: user});
const registerFailure = (error) => ({type: REGESTER_FAILURE, payload: error});

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        console.log("user", user);

        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }

        dispatch(registerSuccess(user.jwt));

    } catch (error) {
        dispatch(registerFailure(error.message));
        throw new Error(error.message);
    }
};


const loginRequest = () => ({type: LOGIN_REQUEST});
const loginSuccess = (user) => ({type: LOGIN_SUCCESS, payload: user});
const loginFailure = (error) => ({type: LOGIN_FAILURE, payload: error});

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const user = response.data;
        console.log("user", user);

        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }

        dispatch(loginSuccess(user.jwt));

    } catch (error) {
        dispatch(loginFailure(error.message));
        throw new Error(error.message);
    }
};



const getUserRequest = () => ({type: GET_USER_REQUEST});
const getUserSuccess = (user) => ({type: GET_USER_SUCCESS, payload: user});
const getUserFailure = (error) => ({type: GET_USER_FAILURE, payload: error});

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());

    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
        console.log("User profile data: ", response);
        const user = response.data;
        
        dispatch(getUserSuccess(user));
        
    } catch (error) {
        console.log("error.response.status", error?.response?.status)
        if(error?.response?.status == 500) {
            // remove jwt token from local storage and show the login page
            localStorage.clear();
            window.location.href='/login';
        }

        console.log("::::::error in action auth:getUser::::::", error);
        dispatch(getUserFailure(error.message));
    }
}


const getAllUsersRequest = () => ({type: GET_ALL_USERS_REQUEST})
const getAllUsersSuccess = (users) => ({ type : GET_ALL_USERS_SUCCESS, payload : users })
const getAllUsersFailure = (error) => ({type: GET_ALL_USERS_FAILURE, payload : error})

export const getAllUsers = () => async (dispatch) => {
    dispatch(getAllUsersRequest())

    try {
       let res = await axios.get(`${API_BASE_URL}/api/users`)  

       console.log(":::::::::all users (auth.action.js)", res.data)
       dispatch(getAllUsersSuccess(res.data))  

    } catch (err) {
        console.log("::::::error in action auth:getAllUsers::::::", err);
        dispatch(getAllUsersFailure(err.message))
    }
}


const deleteUserRequest = () =>({type: DELETE_USER_REQUEST})  
const deleteUserSuccess = (id) => ({type: DELETE_USER_SUCCESS, payload: id}) 
const deleteUserFailure = (error) => ({type:DELETE_USER_FAILURE ,payload: error})    

export const deleteUserProfile   = (userId) => async (dispatch)=> {
    dispatch(deleteUserRequest());
    try {
        
        // let config = { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}};

        let response = await axios.delete(`${API_BASE_URL}/api/users/profile/${userId}`);
        if(response.status === 200){
           dispatch(deleteUserSuccess(userId));
        }else{
            throw new Error("Fail to Delete User Profile (action.js)")
        }       
    }catch(error){
        dispatch(deleteUserFailure(error.message))
    }
}


export const logout = () => (dispatch) => {
    // localStorage.removeItem("jwt"); 
    dispatch({ type: LOGOUT, payload: null })
    localStorage.clear();
};