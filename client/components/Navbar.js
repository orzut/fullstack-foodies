import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Pages/Cart";


const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <Link to="/">
      <h1>Fullstack Food Delivery</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div className="container mx-auto flex items-center justify-between py-1 text-black px-2">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/map">Map</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/cart"><AiOutlineShoppingCart className="text-[30px]" />
            {/* <li>CART ({ cart.lineItems.reduce((acc, lineitem) => acc + lineitem.quantity, 0 ) })</li> */}
          </Link>
        </div>
      ) : (
        <div className="container mx-auto flex items-center justify-between py-1 text-black px-2">
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/map">Map</Link>
          <Link to="/cart"><AiOutlineShoppingCart className="text-[30px]"/>
            {/* <li>CART ({ cart.lineItems.reduce((acc, lineitem) => acc + lineitem.quantity, 0 ) })</li> */}
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);