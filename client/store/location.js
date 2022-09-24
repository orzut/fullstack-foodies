const FETCH_USER_LOCATION = "FETCH_USER_LOCATION";

const location = (state = {}, action) => {
  if (action.type === FETCH_USER_LOCATION) {
    return action.location;
  }
  return state;
};

export const getUserLocation = () => {
  return async (dispatch) => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          dispatch({ type: FETCH_USER_LOCATION, location: position.coords });
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

export default location;
