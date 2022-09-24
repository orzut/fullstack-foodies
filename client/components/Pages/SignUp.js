import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    const user = this.state;
    this.props.signup(user);
  }
  render() {
    const { username, password, firstName, lastName, email } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="flex flex-col border-solid border-2 w-2/4 m-auto">
      <div className="container">
      <div className="row">
        <div className="col-lg-7">
          <div className="featured-text">
            <h1 className="pb-3">Welcome <span className="orange-text">to Fullstack Foodies!</span></h1>
            <div className="row">
              <div>
                <div className="list-box d-flex">
                  <div className="list-icon">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <div className="content">
                    <h3>Home Delivery</h3>
                    <p>Get quick delivery in your area.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="list-box d-flex">
                  <div className="list-icon">
                    <i className="fas fa-money-bill-alt"></i>
                  </div>
                  <div className="content">
                    <h3>Best Price</h3>
                    <p>We offer competitive pricing and regular coupons for our members.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="list-box d-flex">
                  <div className="list-icon">
                    <i className="fas fa-briefcase"></i>
                  </div>
                  <div className="content">
                    <h3>Great Restaurants</h3>
                    <p>We offer great restaurants in your area.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="list-box d-flex">
                  <div className="list-icon">
                    <i className="fas fa-sync-alt"></i>
                  </div>
                  <div className="content">
                    <h3>Low Fees</h3>
                    <p>We do our best to keep delivery fees at a minimum</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="flex flex-col border-solid border-2 w-2/4 m-auto">
        <h2 className="text-center mt-5 text-xl">Create Your Account</h2>
        <form onSubmit={onSubmit} className="flex flex-col w-2/4 m-auto">
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={firstName}
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={onChange}
            required
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={lastName}
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={onChange}
            required
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={email}
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={onChange}
            required
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={username}
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={onChange}
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            required
          ></input>
          <button
            type="submit"
            className="bg-slate-400 rounded-md m-2 p-2 text-white"
          >
            Create account
          </button>
        </form>
        <a
          href="/auth/google"
          className="bg-red-600 rounded-md p-2 text-white text-center w-2/4 m-auto mb-5"
        >
          <button>Sign in with Google</button>
        </a>
        <div>
       
    </div>
    </div>
    </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    signup: (user) => dispatch(authenticate(user, "signup")),
  };
};

export default connect((state) => state, mapDispatch)(SignUp);
