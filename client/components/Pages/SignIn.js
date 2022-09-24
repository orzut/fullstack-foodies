import React, { Component } from "react";
import { connect } from "react-redux";
import { authenticate } from "../../store";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.login(credentials);
  }

  render() {
    const { username, password } = this.state;
    const { onChange, onSubmit } = this;
    return (
      <div className="flex flex-col border-solid border-2 w-2/4 m-auto">
        <h2 className="text-center mt-5 text-xl">Sign In</h2>
        <form onSubmit={onSubmit} className="flex flex-col w-2/4 m-auto">
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={username}
            type="text"
            name="username"
            placeholder="username"
            required
            onChange={onChange}
          ></input>
          <input
            className="border border-slate-300 rounded-md m-2 p-2"
            value={password}
            type="password"
            name="password"
            placeholder="password"
            onChange={onChange}
            required
          ></input>
          <button
            type="submit"
            className="bg-slate-400 rounded-md m-2 p-2 text-white"
          >
            Sign In
          </button>
        </form>
        <a
          href="/auth/google"
          className="bg-red-600 rounded-md p-2 text-white text-center w-2/4 m-auto mb-5"
        >
          <button>Sign in with Google</button>
        </a>

        <div>
        <div class="container">
          <div class="row">
            <div class="col-lg-7">
              <div class="featured-text">
                <h1 class="pb-3">Welcome <span class="orange-text">to Fullstack Foodies!</span></h1>
                <div class="row">
                  <div>
                    <div class="list-box d-flex">
                      <div class="list-icon">
                        <i class="fas fa-shipping-fast"></i>
                      </div>
                      <div class="content">
                        <h3>Home Delivery</h3>
                        <p>Get quick delivery in your area.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="list-box d-flex">
                      <div class="list-icon">
                        <i class="fas fa-money-bill-alt"></i>
                      </div>
                      <div class="content">
                        <h3>Best Price</h3>
                        <p>We offer competitive pricing and regular coupons for our members.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="list-box d-flex">
                      <div class="list-icon">
                        <i class="fas fa-briefcase"></i>
                      </div>
                      <div class="content">
                        <h3>Great Restaurants</h3>
                        <p>We offer great restaurants in your area.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="list-box d-flex">
                      <div class="list-icon">
                        <i class="fas fa-sync-alt"></i>
                      </div>
                      <div class="content">
                        <h3>Low Fees</h3>
                        <p>We do our best to keep delivery fees at a minimum</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="https://about.grubhub.com/wp-content/uploads/2022/03/Icon_Burger.png"/>
        </div>
      </div>
    </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    login: (credentials) => dispatch(authenticate(credentials, "login")),
  };
};

export default connect((state) => state, mapDispatch)(SignIn);
