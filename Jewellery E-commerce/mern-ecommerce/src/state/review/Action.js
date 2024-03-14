import { api } from "../../config/apiConfig"
import { ADD_REVIEW_TO_PRODUCT_FAILURE, ADD_REVIEW_TO_PRODUCT_REQUEST, ADD_REVIEW_TO_PRODUCT_SUCCESS, GET_REVIEW_FAILURE, GET_REVIEW_REQUEST, GET_REVIEW_SUCCESSS } from "./ActionType"

export const addReviewToProduct = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_REVIEW_TO_PRODUCT_REQUEST })

    try {
        const { data } = await api.post('/api/reviews/create', reqData);

        dispatch({
            type: ADD_REVIEW_TO_PRODUCT_SUCCESS,
            payload: data,
        })

        // Check if the modal context exists and close it
        if (reqData.modal) {
            reqData.navigate(`/product/${reqData.productId}`)
            reqData.modal.closeModal();
        }
    } catch (error) {
        console.log("create review (Action.js) error: ", error.message);

        dispatch({
            type: ADD_REVIEW_TO_PRODUCT_FAILURE,
            payload: error.message,
        })
    }
}

export const getAllReview = (reqData) => async (dispatch) => {
    dispatch({ type: GET_REVIEW_REQUEST })
    const productId = reqData.productId;

    try {
        const { data } = await api.get('/api/reviews/product/'+ productId );

        console.log('getAllReview action data : ', data);

        dispatch({
            type: GET_REVIEW_SUCCESSS,
            payload: data,
        })
    } catch (error) {
        console.log('getAllReview action error : ', error.message);

        dispatch({
            type: GET_REVIEW_FAILURE,
            payload: error.message,
        })
    }
}