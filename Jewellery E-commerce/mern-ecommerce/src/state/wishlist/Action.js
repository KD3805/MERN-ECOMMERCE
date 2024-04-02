import { api } from "../../config/apiConfig";
import { ADD_WISH_ITEM_FAILURE, ADD_WISH_ITEM_REQUEST, ADD_WISH_ITEM_SUCCESS, GET_WISH_FAILURE, GET_WISH_REQUEST, GET_WISH_SUCCESSS, REMOVE_WISH_ITEM_FAILURE, REMOVE_WISH_ITEM_REQUEST, REMOVE_WISH_ITEM_SUCCESSS } from "./ActionType"

export const getWish = () => async (dispatch) => {
    dispatch({ type: GET_WISH_REQUEST });

    try {
        const { data } = await api.get('/api/wish');
        dispatch({ type: GET_WISH_SUCCESSS, payload: data })
        console.log("GET WISHLIST DATA (Action.js):::::", data)

    } catch (error) {
        dispatch({ type: GET_WISH_FAILURE, payload: error.message })
    }
}

export const addWishItem = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_WISH_ITEM_REQUEST });

    try {
        
        const { data } = await api.put('/api/wish/add', reqData);
        dispatch({ type: ADD_WISH_ITEM_SUCCESS, payload: data });
        console.log("ADD WISH ITEM (Action.js):::::", data)

        return data;

    } catch (error) {
        dispatch({ type: ADD_WISH_ITEM_FAILURE, payload: error.message });
    }
}

export const removeWishItem = (wishProductId) => async (dispatch) => {
    dispatch({ type: REMOVE_WISH_ITEM_REQUEST });

    try {
        const { data } = await api.delete(`/api/wish/${wishProductId}`);
        dispatch({ type: REMOVE_WISH_ITEM_SUCCESSS, payload: wishProductId });
        console.log("REMOVED WISH ITEM DATA:::::", data)

    } catch (error) {
        dispatch({ type: REMOVE_WISH_ITEM_FAILURE, payload: error.message })
    }
}