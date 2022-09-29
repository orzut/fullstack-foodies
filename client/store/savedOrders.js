import axios from 'axios';

const SET_SAVED_ORDERS = 'SET_SAVED_ORDERS';
const ADD_SAVED_ORDER = 'ADD_SAVED_ORDER';
const REMOVE_SAVED_ORDER = 'REMOVE_SAVED_ORDER';

export default (state=[], action) => {
    switch (action.type) {
        case SET_SAVED_ORDERS:
            return action.savedOrders
        case ADD_SAVED_ORDER:
            return [...state,action.savedOrder]
        case REMOVE_SAVED_ORDER:
            return state.filter(order => order.id!==action.order.id)
        default:
            return state
    }
};

export const fetchSavedOrders = () => {
    return async (dispatch, getState) => {
        const savedOrders = (await axios.get('/api/saved-orders', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data;
        dispatch({type: SET_SAVED_ORDERS, savedOrders})
    }
};

export const addSavedOrders = (name) => {
    return async (dispatch, getState) => {
        const savedOrder = (await axios.post('/api/saved-orders',
            {
                name: name,
                userId: getState().cart.userId,
                orderId: getState().cart.id
            },
            {
                headers: {
                    authorization: window.localStorage.getItem('token')
            }
        })).data
        dispatch({type: ADD_SAVED_ORDER, savedOrder})
    }
};

export const removeSavedOrders = () => {
    return async (dispatch, getState) => {
        await axios.delete(`/api/saved-orders/${getState().cart.id}`, {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })
        dispatch({type: REMOVE_SAVED_ORDER, order:getState().cart})
    }
};

