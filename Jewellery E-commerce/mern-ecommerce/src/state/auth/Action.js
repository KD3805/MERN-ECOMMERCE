import axios from 'axios';
import { API_BASE_URL } from '../../config/apiConfig';
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGESTER_FAILURE, REGESTER_REQUEST, REGESTER_SUCCESS } from './ActionType';
import { useContext } from 'react';
import { ModalContext } from '../../context/modal/modalContext';

const registerRequest = () => ({type: REGESTER_REQUEST});
const registerSuccess = (user) => ({type: REGESTER_SUCCESS, payload: user});
const registerFailure = (error) => ({type: REGESTER_FAILURE, payload: error});

export const register = (userData, modal) => async (dispatch) => {
    dispatch(registerRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        console.log("user", user);

        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }

        dispatch(registerSuccess(user.jwt));

        if (user) {
            userData.navigate('/');
            modal.closeModal();
        }
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};



const loginRequest = () => ({type: LOGIN_REQUEST});
const loginSuccess = (user) => ({type: LOGIN_SUCCESS, payload: user});
const loginFailure = (error) => ({type: LOGIN_FAILURE, payload: error});

export const login = (userData, modal) => async (dispatch) => {
    dispatch(loginRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const user = response.data;
        console.log("user", user);

        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }

        dispatch(loginSuccess(user.jwt));

        if (user) {
            userData.navigate('/');
            modal.closeModal();
        }
    } catch (error) {
        console.error("Error during login:", error);
        dispatch(loginFailure(error.message));
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
        const user = response.data;

        dispatch(getUserSuccess(user));

    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
}

export const logout = () => (dispatch) => {
    // localStorage.removeItem("jwt"); 
    dispatch({ type: LOGOUT, payload: null })
    localStorage.clear();
};