import axios from "axios";

const SET_MENU = "SET_MENU";

const dishes = (state = [], action) => {
  if (action.type === SET_MENU) {
    return action.dishes;
  }
  return state;
};

//fetch menu for specific restaurant
export const fetchMenu = (restaurant) => {
  return async (dispatch) => {
    try {
      const dishes = (await axios.get(`/api/restaurants/${restaurant.id}/menu`))
        .data;
      dispatch({ type: SET_MENU, dishes });
    } catch (err) {
      console.log(err);
    }
  };
};

//fetch all dishes
export const fetchDishes = () => {
  return async (dispatch) => {
    try {
      const dishes = (await axios.get("/api/dishes")).data;
      dispatch({ type: SET_MENU, dishes });
    } catch (err) {
      console.log(err);
    }
  };
};

export default dishes;
