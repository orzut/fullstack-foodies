import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import PastOrders from './components/PastOrders';
import Map from "./components/Map";
import { authenticate, fetchRestaurants, fetchCuisines, fetchCart} from "./store";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Restaurants from "./components/Pages/Restaurants";
import LandingPage from "./components/Pages/LandingPage";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout";
import { SearchData } from "./components/Pages/SearchData";
import success from "./components/Stripe/success"
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
      <div>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/restaurants" exact component={Restaurants} />
          <Route path="/search" component={SearchData} />
        </Switch>

        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path='/past-orders' component={PastOrders} />
            <Route path="/map" component={Map} />
            <Route path="/checkout" component={Checkout} />
            <Route exact path='/success' component={success}/>
          </Switch>
        ) : (
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/map" component={Map} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
 const mapStateToProps = (state)=> {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchRestaurants());
      dispatch(fetchCuisines());

      // dispatch(fetchCategories());
    },
    fetchCart: () => dispatch(fetchCart()),
    authenticate: () => dispatch(authenticate())
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatch)(Routes));
