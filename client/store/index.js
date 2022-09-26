import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import auth from "./auth";
import restaurants from "./restaurants";
import reviews from "./reviews";
import dishes from "./dishes";
import categories from "./categories";
import cuisines from "./cuisines";
import lineItems from "./lineitems";
import cart from "./cart";
import address from "./address";
import orders from "./orders";
import users from "./users";
import location from "./location";
import savedRestaurants from './savedRestaurants';

const reducer = combineReducers({
  auth,
  restaurants,
  reviews,
  dishes,
  categories,
  cuisines,
  lineItems,
  cart,
  users,
  orders,
  address,
  location,
  savedRestaurants
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
export * from "./lineitems";
export * from "./cart";
export * from "./users";
export * from "./orders";
export * from "./address";
export * from "./location";
export * from './savedRestaurants';