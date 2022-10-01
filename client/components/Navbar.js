import React, { useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Pages/Cart";
import UserButton from "./UserButton";
import UserLocation from './UserLocation';
import { Search } from "./Pages/Search";
import './Navbar.css';

const Navbar = ({ handleClick, isLoggedIn }) => {
  return (
    <div>
      <nav className="relative flex items-center justify-between px-2 py-3 bg-gray-900 mb-3">
        {isLoggedIn ? (
          <div className="uppercase text-white text-sm font-bold leading-relaxed container mx-auto flex items-center justify-between py-1 px-2 ">
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/map">Nearby</Link>
            <Link to="/cart">
              <AiOutlineShoppingCart className="text-[30px]" />
            </Link>
            <UserButton />
          </div>
        ) : (
          <div className="uppercase text-white text-sm font-bold leading-relaxed container mx-auto flex items-center justify-between py-1 px-2 ">
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/restaurants">Restaurants</Link>
            <Link to="/map">Nearby</Link>
          </div>
        )}
        <div className='navbar-search'>
          <div>
            <UserLocation />
          </div>
          <span className="h-12 font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-pink-600 rounded-full text-sm bg-pink-100 items-center rounded-r-none pl-2 py-1 text-pink-800 border-r-0 placeholder-pink-300">
            <Search />
          </span>
        </div>
      </nav>
      <hr />
    </div>
  );
};

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
