import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Header } from "./Pages/Header";


const Navbar = ({ handleClick, isLoggedIn, auth, cart }) => (
  <div>
    <Header />
    <nav>
      {isLoggedIn ? (
        <div className="container mx-auto flex items-center justify-between py-1 text-black px-2">
          {/* The navbar will show these links after you log in */}
          <Link to="/"><h1>Home</h1></Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/map">Map</Link>
          <Link to="/cart"><AiOutlineShoppingCart className="text-[30px]"/>
            {/* <li>CART ({ cart.lineItems.reduce((acc, lineitem) => acc + lineitem.quantity, 0 ) })</li> */}
          </Link> 
        </div>
      ) : (
        <div className="container mx-auto flex items-center justify-between py-1 text-black px-2">
          {/* The navbar will show these links before you log in */}
          <Link to="/"><h1>Home</h1></Link>
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
 const mapStateToProps = (state) => {
  return state;
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Navbar);
