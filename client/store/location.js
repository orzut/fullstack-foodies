import axios from "axios";

const FETCH_USER_LOCATION = "FETCH_USER_LOCATION";
const SET_USER_LOCATION = "SET_USER_LOCATION";

const location = (state = {}, action) => {
  if (action.type === FETCH_USER_LOCATION) {
    return action.location;
  } else if (action.type === SET_USER_LOCATION) {
    return action.location;
  }
  return state;
};

export const getUserLocation = () => {
  return async (dispatch) => {
    try {
      const location = (
        await axios.get("/api/location", {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        })
      ).data;
      dispatch({ type: FETCH_USER_LOCATION, location });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const setUserLocation = (userLocation) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/location", userLocation, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch({ type: SET_USER_LOCATION, location: response.data });
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default location;
