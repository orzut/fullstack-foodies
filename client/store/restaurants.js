import axios from "axios";

const SET_RESTAURANTS = "SET_RESTAURANTS";

const restaurants = (state = [], action) => {
  if (action.type === SET_RESTAURANTS) {
    return action.restaurants;
  }
  return state;
};

export const fetchRestaurants = () => {
  return async (dispatch) => {
    try {
      const restaurants = (await axios.get("/api/restaurants")).data;
      dispatch({ type: SET_RESTAURANTS, restaurants });
    } catch (err) {
      console.log(err);
    }
  };
};

export default restaurants;
