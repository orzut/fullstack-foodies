const FETCH_USER_LOCATION = "FETCH_USER_LOCATION";
const SET_USER_LOCATION = 'SET_USER_LOCATION';

const location = (state = {}, action) => {
  if (action.type === FETCH_USER_LOCATION) {
    return action.location;
  } else if (action.type === SET_USER_LOCATION) {
    return action.location
  }
  return state;
};

export const getUserLocation = () => {
  return async (dispatch) => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          dispatch({ type: FETCH_USER_LOCATION, location: userLocation });
        });
      }
    } catch (ex) {
      console.log(ex);
    }
  };
};

export const setUserLocation = (userLocation) => {
  return (dispatch) => {
    try {
      dispatch({type: SET_USER_LOCATION, location: userLocation});
    } catch (ex) {
      console.log(ex);
    }
  }
}

export default location;
