import React from "react";
import { connect } from 'react-redux';
import { fetchCart } from "./store/cart";
import Navbar from "./components/Navbar";
import { Switch, Link, Route, HashRouter as Router } from 'react-router-dom';
import { Header } from "./components/Pages/Header";
import { LandingPage } from "./components/Pages/LandingPage";
import { Footer } from "./components/Footer";
import Routes from "./Routes";
import Cart from "./components/Pages/Cart";
import NotFound from "./components/Pages/NotFound";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";
import Restaurants from "./components/Pages/Restaurants";
import Map from "./components/Map";



class App extends React.Component{
  
  componentDidUpdate(prevProps){
    if(!prevProps.auth.id && this.props.auth.id){
      this.props.fetchCart();
    }
  }

  
  render(){
    return (
      <div> 
      <Router>
        <div>
          <Route component={ Navbar }/>
          <main id='main-container'>
            <Switch>
              <Route exact path='/' component={ LandingPage } />
               
              <Route exact path='/restaurants' component={ Restaurants } />
              <Route exact path='/login' component={ SignIn } />
              <Route exact path='/signup' component={ SignUp } />
              <Route exact path='/cart' component={ Cart } />
              <Route path="/map" component={Map} />
              <Route path="" component={NotFound} />
            </Switch>
              
            <Route component={ Footer }/>


          </main>
        </div>
      </Router>
      </div>
    );

  }
}
const mapDispatch = (dispatch)=> {
  return {
    exchangeToken: ()=> dispatch(exchangeToken()),
    fetchCart: ()=> dispatch(fetchCart()),
    fetchProducts: ()=>dispatch(fetchProducts()),
    fetchWishlist: () => dispatch(fetchWishlist())
  };
};
const mapStateToProps = (state)=> {
  return state;
};
export default connect(mapStateToProps, mapDispatch)(App);

