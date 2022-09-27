import axios from 'axios';

const SET_SAVED_RESTAURANTS = 'SET_SAVED_RESTAURANTS';
const ADD_SAVED_RESTAURANT = 'ADD_SAVED_RESTAURANTS';
const REMOVE_SAVED_RESTAURANT = 'REMOVE_SAVED_RESTAURANTS';

const savedRestaurants = (state = [], action) => {
    switch (action.type) {
        case SET_SAVED_RESTAURANTS:
            return action.savedRestaurants
        case ADD_SAVED_RESTAURANT:
            return [...state, action.newSavedRestaurant]
        case REMOVE_SAVED_RESTAURANT:
            return [...state.filter(restaurant => {
                return restaurant.id !== action.restaurant.id
            })]
        default:
            return state
    }
};

const fetchSavedRestaurants = () => {
    return async (dispatch) => {
        const savedRestaurants = (await axios.get('/api/savedRestaurants', {
            headers: {
                authorization: window.localStorage.getItem('token')
            }
        })).data
        dispatch({type: SET_SAVED_RESTAURANTS, savedRestaurants})
    }
}

const addSavedRestaurants = (newRestaurant) => {
    return async (dispatch) => {
        const newSavedRestaurant = (await axios.post('/api/savedRestaurants', newRestaurant, {
            headers: {
                authorization: window.localStorage.getItem("token"),
            }
        })).data
        dispatch({type: ADD_SAVED_RESTAURANT, newSavedRestaurant})
    }
}

const removeSavedRestaurants = (restaurant) => {
    return async (dispatch) => {
        await axios.delete(`/api/savedRestaurants/${restaurant.id}`, {
            headers: {
                authorization: window.localStorage.getItem("token"),
            }
        })
        dispatch({type: REMOVE_SAVED_RESTAURANT, restaurant})
    }
}
export default savedRestaurants;
export {
    fetchSavedRestaurants,
    addSavedRestaurants,
    removeSavedRestaurants
}