import { api } from "../../config/apiConfig"
import { ADD_REVIEW_TO_PRODUCT_FAILURE } from "../review/ActionType";
import { ADD_RATING_TO_PRODUCT_REQUEST, ADD_RATING_TO_PRODUCT_SUCCESS, GET_RATING_FAILURE, GET_RATING_REQUEST, GET_RATING_SUCCESSS } from "./ActionType"

export const addRatingToProduct = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_RATING_TO_PRODUCT_REQUEST })

    try {
        const { data } = await api.post('/api/ratings/create', reqData);

        dispatch({
            type: ADD_RATING_TO_PRODUCT_SUCCESS, 
            payload: data,
        })

        // Check if the modal context exists and close it
        if (reqData.modal) {
            reqData.navigate(`/product/${reqData.productId}`)
            reqData.modal.closeModal();
        }
    } catch (error) {
        console.log("create rating (Action.js) error: ", error.message);

        dispatch({
            type: ADD_REVIEW_TO_PRODUCT_FAILURE,
            payload: error.message,
        })
    }
}

export const getAllRatings = (reqData) => async (dispatch) => {
    dispatch({ type: GET_RATING_REQUEST })
    const productId = reqData.productId;

    try {
        const { data } = await api.get('/api/ratings/product/'+ productId );

        console.log('getAllRatings action data : ', data);

        dispatch({
            type: GET_RATING_SUCCESSS,
            payload: data,
        })
    } catch (error) {
        console.log('getAllRatings action error : ', error.message);

        dispatch({
            type: GET_RATING_FAILURE,
            payload: error.message,
        })
    }
}