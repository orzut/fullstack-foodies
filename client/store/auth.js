import axios from "axios";
import history from "../history";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";
const UPDATE_AUTH = "UPDATE_AUTH"

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });
const updateAuth = (auth) => ({ type: UPDATE_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = () => {
  return async(dispatch)=> {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    const auth = res.data
    dispatch({ auth, type: SET_AUTH});
  }
  }
};

export const authenticate = (user, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, user);
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const updateUser = (user) => {
  return async(dispatch) => {
    console.log('im updating userrrrrrrrrrrrrrr')
    console.log(user)
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.put(`/api/users/${ user.id }`, user, {
        headers: {
          authorization: token
        }
      });
      user = response.data;
      dispatch({ type: UPDATE_AUTH, user })
    }
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_AUTH:
      return action.user;
    default:
      return state;
  }
}
