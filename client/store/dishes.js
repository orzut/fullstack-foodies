import axios from "axios";

const SET_MENU = "SET_MENU";

const dishes = (state = [], action) => {
  if (action.type === SET_MENU) {
    return action.dishes;
  }
  return state;
};

export const fetchMenu = (restaurant) => {
  return async (dispatch) => {
    try {
      const dishes = (await axios.get(`/api/${restaurant.id}/menu`)).data;
      dispatch({ type: SET_MENU, dishes });
    } catch (err) {
      console.log(err);
    }
  };
};

export default dishes;
