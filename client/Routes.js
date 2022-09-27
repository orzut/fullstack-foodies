import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Router } from "react-router-dom";
import Home from "./components/Home";
import PastOrders from "./components/PastOrders";
import Saved from './components/Saved';
import Map from "./components/Map";
import {
  authenticate,
  me,
  fetchRestaurants,
  fetchCuisines,
  fetchCart,
  fetchDishes,
  fetchCategories,
  fetchReviews,
  fetchSavedRestaurants
} from "./store";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Restaurants from "./components/Pages/Restaurants";
import LandingPage from "./components/Pages/LandingPage";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout";
import { SearchData } from "./components/Pages/SearchData";
import { Restaurant } from "./components/Pages/Restaurant";
import success from "./components/Stripe/success";
import NotFound from "./components/Pages/NotFound";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <main>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/restaurants" component={Restaurants} />
          <Route exact path="/search" component={SearchData} />
          <Route exact path="/restaurants/:id" component={Restaurant} />
          <Route exact path="/map" component={Map} />

        {isLoggedIn ? (
          <Switch>
            //<Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/past-orders" component={PastOrders} />
            <Route path="/saved" component={Saved} />
            //<Route path="/map" component={Map} />
            <Route path="/checkout" component={Checkout} />
            <Route exact path="/success" component={success} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/login" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        )}

        <Route path="" component={NotFound} />
        </Switch>
      </main>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchRestaurants());
      dispatch(fetchCuisines());
      dispatch(fetchDishes());
      dispatch(fetchCategories());
      dispatch(fetchReviews());
    },
    fetchCart: () => dispatch(fetchCart()),
    authenticate: () => dispatch(authenticate()),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatch)(Routes));