import axios from "axios";

const reviews = (state = [], action) => {
  if (action.type === "SET_REVIEWS") {
    return action.reviews;
  }
  return state;
};

export const fetchReviews = (restaurant) => {
  return async (dispatch) => {
    const reviews = (await axios.get(`/api/${restaurant.id}/reviews`)).data;
    dispatch({ type: "SET_REVIEWS", reviews });
  };
};

export default reviews;
