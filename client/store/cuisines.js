import axios from "axios";

const SET_CUISINES = "SET_RESTAURANT_CUISINES";

const cuisines = (state = [], action) => {
  if (action.type === SET_CUISINES) {
    return action.cuisines;
  }
  return state;
};

export const fetchCuisines = () => {
  return async (dispatch) => {
    try {
      const cuisines = (await axios.get("/api/cuisines")).data;
      dispatch({ type: SET_CUISINES, cuisines });
    } catch (err) {
      console.log(err);
    }
  };
};

export default cuisines;
