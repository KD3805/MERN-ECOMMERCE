import { api } from "../../../config/apiConfig"
import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, PLACED_ORDER_FAILURE, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"


export const getOrders = () => async(dispatch) => {
    dispatch({type: GET_ORDERS_REQUEST})

    try {
        const response = await api.get(`/api/admin/orders`)
        
        dispatch({type: GET_ORDERS_SUCCESS, payload: response.data})
    } catch (error) {
        console.log('admin order catch error', error.message)
        dispatch({type: GET_ORDERS_FAILURE, payload: error.message})
    }
}

export const confirmedOrder = (orderId) => async(dispatch) => {
    dispatch({type: CONFIRMED_ORDER_REQUEST})

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/confirmed`);
        console.log("confirmed_order", data)

        dispatch({type: CONFIRMED_ORDER_SUCCESS, payload: data});
    } catch (error) {
        console.log('confirm order catch error', error.message)
        dispatch({type: CONFIRMED_ORDER_FAILURE, payload: error.message})
    }
}

export const shippedOrder = (orderId) => async(dispatch) => {
    dispatch({type: SHIP_ORDER_REQUEST})

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
        console.log("ship_order", data)

        dispatch({type: SHIP_ORDER_SUCCESS, payload: data});
    } catch (error) {
        console.log('ship order catch error', error.message)
        dispatch({type: SHIP_ORDER_FAILURE, payload: error.message})
    }
}

export const deliveredOrder = (orderId) => async(dispatch) => {
    dispatch({type: DELIVERED_ORDER_REQUEST})

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/deliver`);
        console.log("deliver_order", data)

        dispatch({type: DELIVERED_ORDER_SUCCESS, payload: data});
    } catch (error) {
        console.log('deliver order catch error', error.message)
        dispatch({type: DELIVERED_ORDER_FAILURE, payload: error.message})
    }
}

export const cancelledOrder = (orderId) => async(dispatch) => {
    dispatch({type: CANCEL_ORDER_REQUEST})

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/cancel`);
        console.log("cancel_order", data)

        dispatch({type: CANCEL_ORDER_SUCCESS, payload: data});
    } catch (error) {
        console.log('cancel order catch error', error.message)
        dispatch({type: CANCEL_ORDER_FAILURE, payload: error.message})
    }
}

export const deleteOrder = (orderId) => async(dispatch) => {
    dispatch({type: DELETE_ORDER_REQUEST})

    try {
        const { data } = await api.put(`/api/admin/orders/${orderId}/delete`);
        console.log("delete_order", data)

        dispatch({type: DELETE_ORDER_SUCCESS, payload: data});
    } catch (error) {
        console.log('delete order catch error', error.message)
        dispatch({type: DELETE_ORDER_FAILURE, payload: error.message})
    }
}

// export const placeOrder = (order) => async(dispatch) => {
//     dispatch({type: PLACED_ORDER_REQUEST})

//     try {
//         const { data } = await api.post(`/api/admin/orders`, order);
//         console.log("placed_order", data)

//         dispatch({type: PLACED_ORDER_SUCCESS, payload: data});
//     } catch (error) {
//         console.log('place order catch error', error.message)
//         dispatch({type: PLACED_ORDER_FAILURE, payload: error.message})
//     }
// }
