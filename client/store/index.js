import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import restaurants from "./restaurants";
import reviews from "./reviews";
import dishes from "./dishes";
import categories from "./categories";
import cuisines from "./cuisines";

const reducer = combineReducers({
  auth,
  restaurants,
  reviews,
  dishes,
  categories,
  cuisines,
});
const middleware = applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./restaurants";
export * from "./reviews";
export * from "./dishes";
export * from "./categories";
export * from "./cuisines";
